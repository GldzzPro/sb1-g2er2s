import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AboutPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>About Us</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Learn more about our company and mission.
        </p>
      </CardContent>
    </Card>
  );
}