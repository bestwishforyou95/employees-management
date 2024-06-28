import { LayoutProps } from '@/models';
import * as React from 'react';

export function EmptyLayout({ children }: LayoutProps) {
  return <div>{children}</div>;
}
