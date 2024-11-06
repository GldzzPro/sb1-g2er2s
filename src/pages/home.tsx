import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function HomePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome Home</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          This is a beautiful home page with modern UI components.
        </p>
      </CardContent>
    </Card>
  );
}