import type { Metadata } from 'next'
import { appInfo } from './config'

const { title, description } = appInfo

export const metadata: Metadata = {
  title,
  description,
}

export const runtime = 'edge'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
