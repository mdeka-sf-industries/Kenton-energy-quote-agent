import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Kenton Energy - Renewable Energy Provider',
  description: 'Get your personalized energy plan quote with Kenton Energy',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  )
}

