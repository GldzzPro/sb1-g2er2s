import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from 'lucide-react';

// Basic Component for Composition
function Dialog({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

// Specialized Dialog using Composition
function ErrorDialog({ message }: { message: string }) {
  return (
    <Dialog title="Error">
      <Alert variant="destructive">
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </Dialog>
  );
}

// Higher-Order Component (HOC)
function withLogging<P extends object>(WrappedComponent: React.ComponentType<P>) {
  return function WithLoggingComponent(props: P) {
    console.log(`Component ${WrappedComponent.name} rendered with props:`, props);
    return <WrappedComponent {...props} />;
  };
}

// Component to be enhanced with HOC
function UserProfile({ name, role }: { name: string; role: string }) {
  return (
    <div className="space-y-2">
      <h3 className="font-medium">{name}</h3>
      <Badge variant="secondary">{role}</Badge>
    </div>
  );
}

// Enhanced component using HOC
const UserProfileWithLogging = withLogging(UserProfile);

// HOC for Loading State
function withLoadingState<P extends object>(WrappedComponent: React.ComponentType<P>) {
  return function WithLoadingComponent(props: P & { loading?: boolean }) {
    const { loading, ...componentProps } = props;
    
    if (loading) {
      return (
        <div className="animate-pulse space-y-2">
          <div className="h-4 bg-muted rounded w-3/4"></div>
          <div className="h-4 bg-muted rounded w-1/2"></div>
        </div>
      );
    }
    
    return <WrappedComponent {...(componentProps as P)} />;
  };
}

// Component with Loading State
const UserProfileWithLoading = withLoadingState(UserProfile);

// Compound Components Pattern
const FormField = {
  Root: ({ children }: { children: React.ReactNode }) => (
    <div className="space-y-2">{children}</div>
  ),
  Label: ({ children }: { children: React.ReactNode }) => (
    <Label>{children}</Label>
  ),
  Input: (props: React.ComponentProps<typeof Input>) => (
    <Input {...props} />
  ),
  Error: ({ children }: { children: React.ReactNode }) => (
    <p className="text-sm text-destructive">{children}</p>
  ),
};

export function PatternsPage() {
  const [loading, setLoading] = useState(false);

  const toggleLoading = () => {
    setLoading(prev => !prev);
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>React Composition & HOC Patterns</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Composition Example */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold">Component Composition</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Dialog title="Welcome">
                <p className="text-muted-foreground">
                  This is a reusable dialog component using composition.
                </p>
                <Button className="mt-4">Action</Button>
              </Dialog>

              <ErrorDialog message="Something went wrong!" />
            </div>
          </section>

          <Separator />

          {/* HOC Example */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold">Higher-Order Components (HOC)</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">With Logging HOC</CardTitle>
                </CardHeader>
                <CardContent>
                  <UserProfileWithLogging 
                    name="John Doe" 
                    role="Administrator" 
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Check console for logged props
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">With Loading State HOC</CardTitle>
                </CardHeader>
                <CardContent>
                  <UserProfileWithLoading 
                    name="Jane Smith" 
                    role="Editor" 
                    loading={loading}
                  />
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={toggleLoading}
                    className="mt-4"
                  >
                    Toggle Loading
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>

          <Separator />

          {/* Compound Components Pattern */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold">Compound Components</h2>
            <Card>
              <CardContent className="pt-6">
                <FormField.Root>
                  <FormField.Label>Username</FormField.Label>
                  <FormField.Input placeholder="Enter username" />
                  <FormField.Error>Username is required</FormField.Error>
                </FormField.Root>
              </CardContent>
            </Card>
          </section>

          {/* Best Practices */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold">Best Practices</h2>
            <Alert>
              <InfoIcon className="h-4 w-4" />
              <AlertDescription>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Favor composition over inheritance</li>
                  <li>Keep components small and focused</li>
                  <li>Use HOCs sparingly and for cross-cutting concerns</li>
                  <li>Consider hooks before reaching for HOCs</li>
                  <li>Use compound components for flexible APIs</li>
                </ul>
              </AlertDescription>
            </Alert>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}