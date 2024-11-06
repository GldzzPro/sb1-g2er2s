import { useState, useEffect } from 'react';
import { HomePage } from '@/pages/home';
import { AboutPage } from '@/pages/about';
import { ContactPage } from '@/pages/contact';
import { ConceptsPage } from '@/pages/concepts';
import { PatternsPage } from '@/pages/patterns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const routes: Record<string, () => JSX.Element> = {
  '/': () => <HomePage />,
  '/about': () => <AboutPage />,
  '/contact': () => <ContactPage />,
  '/concepts': () => <ConceptsPage />,
  '/patterns': () => <PatternsPage />,
};

export function Router() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const onLocationChange = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', onLocationChange);
    return () => window.removeEventListener('popstate', onLocationChange);
  }, []);

  const RouteComponent = routes[currentPath];
  
  if (!RouteComponent) {
    return (
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">404 Not Found</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist.
          </p>
        </CardContent>
      </Card>
    );
  }

  return <RouteComponent />;
}