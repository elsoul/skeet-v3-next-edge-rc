import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import md5 from 'crypto-js/md5'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const blurDataURL =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='500'%3E%3Crect width='100%25' height='100%25' fill='%23f8f8f8'/%3E%3C/svg%3E"

export function getGravatarUrl(email: string | null | undefined): string {
  if (!email) {
    return ''
  }
  const trimmedEmail = email.trim().toLowerCase()
  const hash = md5(trimmedEmail).toString()
  return `https://www.gravatar.com/avatar/${hash}`
}

export const formatNumber = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)

export const runAsyncFnWithoutBlocking = (
  fn: (...args: any) => Promise<any>,
) => {
  fn()
}

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export const uniqueArray = <T>(arr: T[]): T[] => {
  return Array.from(new Set(arr.map((item) => JSON.stringify(item)))).map(
    (item) => JSON.parse(item) as T,
  )
}

export function truncateContent(
  content: string | string[],
  maxLength: number,
): string {
  let text = ''

  if (Array.isArray(content)) {
    text = content.join(' ')
  } else {
    text = content
  }

  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...'
  }

  return text
}
