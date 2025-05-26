import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Suspense } from 'react'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'
import FloatingButtons from './components/FloatingButtons'
import AnalyticsProvider from './components/AnalyticsProvider'
import { LanguageProvider } from './contexts/LanguageContext'
import { DEFAULT_METADATA, HOMEPAGE_SCHEMA } from './lib/metadata'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = DEFAULT_METADATA

function LanguageProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LanguageProvider>
        {children}
      </LanguageProvider>
    </Suspense>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <LanguageProviderWrapper>
          <AnalyticsProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
              <FloatingButtons />
            </div>
          </AnalyticsProvider>
        </LanguageProviderWrapper>
        
        {/* Schema.org JSON-LD */}
        <Script
          id="schema-homepage"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(HOMEPAGE_SCHEMA) }}
        />
        
        {/* Vercel Analytics */}
        <Analytics />
        
        {/* Vercel Speed Insights */}
        <SpeedInsights />
      </body>
    </html>
  )
} 