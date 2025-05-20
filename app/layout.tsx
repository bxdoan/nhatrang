import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'
import FloatingButtons from './components/FloatingButtons'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nha Trang Insight | Thông tin du lịch & đời sống Nha Trang',
  description: 'Cung cấp thông tin du lịch, chuyến bay, giao thông, ẩm thực và lịch sử Nha Trang - Khánh Hòa giúp bạn có chuyến đi tuyệt vời nhất.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <FloatingButtons />
        </div>
      </body>
    </html>
  )
} 