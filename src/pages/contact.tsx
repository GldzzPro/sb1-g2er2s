import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Us</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Name</label>
          <Input placeholder="Enter your name" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <Input type="email" placeholder="Enter your email" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Message</label>
          <Textarea placeholder="Type your message here" />
        </div>
        <Button className="w-full">Send Message</Button>
      </CardContent>
    </Card>
  );
}