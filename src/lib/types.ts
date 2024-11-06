export interface RouteProps {
  to: string;
  children: React.ReactNode;
}

export interface NavLinkProps extends RouteProps {
  icon?: React.ComponentType<{ className?: string }>;
}