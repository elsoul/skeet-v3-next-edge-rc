'use client'

import { useTranslations } from 'next-intl'

export default function ChatTitle() {
  const t = useTranslations()
  return (
    <>
      <div className="mx-auto mb-4 flex w-full max-w-2xl flex-row items-center justify-between gap-16">
        <p className="flex-shrink-0 font-bold text-zinc-500 dark:text-zinc-300 sm:text-xl">
          GPT-4o
        </p>
        <p className="text-xs text-zinc-500 dark:text-zinc-300">
          {t('chat.aiMayMistake')}
        </p>
      </div>
    </>
  )
}
