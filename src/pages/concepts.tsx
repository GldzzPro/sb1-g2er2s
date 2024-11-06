import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

export function ConceptsPage() {
  // Controlled Component
  const [controlledInput, setControlledInput] = useState('');
  
  // Uncontrolled Component
  const uncontrolledInputRef = useRef<HTMLInputElement>(null);
  
  // Component Lifecycle & Effects
  const [count, setCount] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  // Memoization with useCallback
  const handleControlledChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setControlledInput(e.target.value);
  }, []);
  
  // Toast notification
  const { toast } = useToast();
  
  // Effect for window resize (Cleanup example)
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    
    // Cleanup function
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Effect with dependency
  useEffect(() => {
    if (count === 5) {
      toast({
        title: "Milestone reached!",
        description: "You've clicked 5 times!",
      });
    }
  }, [count, toast]);
  
  // Handle uncontrolled form submission
  const handleUncontrolledSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = uncontrolledInputRef.current?.value;
    toast({
      title: "Uncontrolled Input",
      description: `Submitted value: ${value}`,
    });
  };
  
  // Handle controlled form submission
  const handleControlledSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Controlled Input",
      description: `Submitted value: ${controlledInput}`,
    });
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>React Concepts Demo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Controlled Component */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold">Controlled Component</h2>
            <form onSubmit={handleControlledSubmit} className="space-y-2">
              <Label htmlFor="controlled">Controlled Input:</Label>
              <div className="flex gap-2">
                <Input
                  id="controlled"
                  value={controlledInput}
                  onChange={handleControlledChange}
                  placeholder="Type something..."
                />
                <Button type="submit">Submit</Button>
              </div>
            </form>
            <p className="text-sm text-muted-foreground">
              Value: {controlledInput}
            </p>
          </section>

          <Separator />

          {/* Uncontrolled Component */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold">Uncontrolled Component</h2>
            <form onSubmit={handleUncontrolledSubmit} className="space-y-2">
              <Label htmlFor="uncontrolled">Uncontrolled Input:</Label>
              <div className="flex gap-2">
                <Input
                  id="uncontrolled"
                  ref={uncontrolledInputRef}
                  placeholder="Type something..."
                  defaultValue="Default Value"
                />
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </section>

          <Separator />

          {/* State & Effects */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold">State & Effects</h2>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Count: {count} | Window Width: {windowWidth}px
              </p>
              <Button onClick={() => setCount(prev => prev + 1)}>
                Increment Count
              </Button>
            </div>
          </section>

          <Separator />

          {/* Component Lifecycle */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold">Component Lifecycle</h2>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                • Mount: Component is added to the DOM<br />
                • Update: Props or state changes<br />
                • Unmount: Component is removed from the DOM
              </p>
              <p className="text-sm">
                Try resizing the window to see the effect in action!
              </p>
            </div>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}