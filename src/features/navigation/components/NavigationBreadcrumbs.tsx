"use client";

import Link from 'next/link';
import { useNavigationContextStore } from '../store/navigationContextStore';

type NavigationBreadcrumbsProps = {
  className?: string;
};

export default function NavigationBreadcrumbs({ className }: NavigationBreadcrumbsProps) {
  const activeProductBreadcrumbs = useNavigationContextStore((state) => state.activeProductBreadcrumbs);

  if (activeProductBreadcrumbs.length === 0) {
    return null;
  }

  return (
    <nav
  aria-label="breadcrumb"
  className={`overflow-x-auto ${className}`}
>
  <ol className="flex items-center space-x-2 whitespace-nowrap text-sm">
    {activeProductBreadcrumbs.map((crumb, index) => {
      const isLast = index === activeProductBreadcrumbs.length - 1;

      return (
        <li
          key={`${crumb.type}-${crumb.id}`}
          className="flex items-center"
        >
          {index > 0 && (
            <span
              className="mx-2 text-muted-foreground"
              aria-hidden="true"
            >
              /
            </span>
          )}

          {isLast ? (
            <span
              className="font-medium text-foreground"
              aria-current="page"
            >
              {crumb.title}
            </span>
          ) : (
            <Link
              href={crumb.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {crumb.title}
            </Link>
          )}
        </li>
      );
    })}
  </ol>
</nav>
  );
}