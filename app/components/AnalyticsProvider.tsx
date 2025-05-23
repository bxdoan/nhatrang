'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackEvent } from '../lib/analytics';

export default function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Track page views
    trackEvent('page_view' as any, {
      page: pathname,
      category: 'navigation',
      label: 'page_visit'
    });
  }, [pathname]);

  return <>{children}</>;
} 