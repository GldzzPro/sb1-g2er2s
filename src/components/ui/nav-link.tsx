import { cn } from "@/lib/utils";
import { NavLinkProps } from "@/lib/types";

export function NavLink({ to, children, icon: Icon }: NavLinkProps) {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.history.pushState({}, '', to);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const isActive = window.location.pathname === to;

  return (
    <a
      href={to}
      onClick={handleClick}
      className={cn(
        "flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors",
        "hover:bg-accent hover:text-accent-foreground rounded-md",
        isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
      )}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </a>
  );
}