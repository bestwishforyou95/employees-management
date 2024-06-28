import { LayoutProps } from 'models/common';

export function MainLayout({ children }: LayoutProps) {
  return (
    <div className="main">
      {children}
    </div>
  );
}
