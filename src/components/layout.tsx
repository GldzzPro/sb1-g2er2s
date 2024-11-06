import { HomeIcon, InfoIcon, MailIcon, MenuIcon, BookOpenIcon, LayersIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavLink } from "./ui/nav-link";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Navigation */}
      <div className="md:hidden fixed top-0 left-0 right-0 p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <MenuIcon className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Navigation</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-2 mt-4">
              <NavLink to="/" icon={HomeIcon}>Home</NavLink>
              <NavLink to="/about" icon={InfoIcon}>About</NavLink>
              <NavLink to="/contact" icon={MailIcon}>Contact</NavLink>
              <NavLink to="/concepts" icon={BookOpenIcon}>React Concepts</NavLink>
              <NavLink to="/patterns" icon={LayersIcon}>React Patterns</NavLink>
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex h-screen">
        <aside className="w-64 border-r px-4 py-6 flex flex-col gap-4">
          <div className="font-semibold text-lg px-4">My App</div>
          <nav className="flex flex-col gap-2">
            <NavLink to="/" icon={HomeIcon}>Home</NavLink>
            <NavLink to="/about" icon={InfoIcon}>About</NavLink>
            <NavLink to="/contact" icon={MailIcon}>Contact</NavLink>
            <NavLink to="/concepts" icon={BookOpenIcon}>React Concepts</NavLink>
            <NavLink to="/patterns" icon={LayersIcon}>React Patterns</NavLink>
          </nav>
        </aside>
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Mobile Content */}
      <main className="md:hidden pt-16 p-4">
        {children}
      </main>
    </div>
  );
}