import React from "react"
import type { Metadata } from 'next'
import { Crimson_Text, Lora } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const crimsonText = Crimson_Text({ weight: ['400', '600', '700'], subsets: ["latin"] });
const lora = Lora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Sikkim State Allied & Healthcare Council',
  description: 'Official website of Sikkim State Allied & Healthcare Council - Statutory Body under Government of Sikkim',
  generator: 'Sikkim State Allied & Healthcare Council',
  icons: {
    icon: [
      {
        url: '/LOGO.png',
        sizes: '32x32',
      },
    ],
    apple: '/LOGO.png',
    shortcut: '/LOGO.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${crimsonText.className} antialiased bg-background text-foreground`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
