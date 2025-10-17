import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter'
})

export const metadata = {
  title: 'Artifex AI - AI-Powered Poster Creator',
  description: 'Create stunning marketing posters with AI-powered design. Powered by Nyrix.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-[#0F0B1E] min-h-screen`}>
        <div className="min-h-screen bg-gradient-to-br from-[#0F0B1E] via-[#1A0B2E] to-[#0F0B1E]">
          {children}
        </div>
      </body>
    </html>
  )
}
