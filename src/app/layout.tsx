import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CodeDock AI',
  description: 'Your AI-powered coding companion',
  icons: {
    icon: '/codedockai.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/codedockai.png" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
