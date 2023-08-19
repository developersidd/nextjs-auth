import Toast from '@/ui/Toast'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next js Fullstack Authentication',
  description: 'This is Fullstack Authentication App Built by Next Js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toast />
        {children}
      </body>
    </html>
  )
}
