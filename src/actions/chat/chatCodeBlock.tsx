// Inspired by Chatbot-UI and modified to fit the needs of this project
// @see https://github.com/mckaywrigley/chatbot-ui/blob/main/components/Markdown/CodeBlock.tsx

'use client'

import { FC, memo } from 'react'
import { Prism, SyntaxHighlighterProps } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'

import { useCopyToClipboard } from '@/hooks/utils/useCopyToClipboard'

import { Button } from '@/components/ui/button'
import {
  CheckIcon,
  ClipboardCopyIcon,
  DownloadIcon,
} from '@radix-ui/react-icons'
import { useTranslations } from 'next-intl'

interface Props {
  language: string
  value: string
}

interface languageMap {
  [key: string]: string | undefined
}

const SyntaxHighlighter = Prism as any as FC<SyntaxHighlighterProps>

export const programmingLanguages: languageMap = {
  javascript: '.js',
  python: '.py',
  java: '.java',
  c: '.c',
  cpp: '.cpp',
  'c++': '.cpp',
  'c#': '.cs',
  ruby: '.rb',
  php: '.php',
  swift: '.swift',
  'objective-c': '.m',
  kotlin: '.kt',
  typescript: '.ts',
  go: '.go',
  perl: '.pl',
  rust: '.rs',
  scala: '.scala',
  haskell: '.hs',
  lua: '.lua',
  shell: '.sh',
  sql: '.sql',
  html: '.html',
  css: '.css',
}

export const generateRandomString = (length: number, lowercase = false) => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXY3456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return lowercase ? result.toLowerCase() : result
}

const CodeBlock: FC<Props> = memo(({ language, value }) => {
  const t = useTranslations()
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 })

  const downloadAsFile = () => {
    if (typeof window === 'undefined') {
      return
    }
    const fileExtension = programmingLanguages[language] || '.file'
    const suggestedFileName = `file-${generateRandomString(
      3,
      true,
    )}${fileExtension}`
    const fileName = window.prompt('Enter file name' || '', suggestedFileName)

    if (!fileName) {
      return
    }

    const blob = new Blob([value], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.download = fileName
    link.href = url
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const onCopy = () => {
    if (isCopied) return
    copyToClipboard(value)
  }

  return (
    <div className="mx-auto mb-6 mt-2 flex w-full flex-col rounded-2xl bg-zinc-800 md:max-w-md lg:max-w-xl">
      <div className="flex flex-row items-center justify-between rounded-t-2xl bg-zinc-800 px-6 pr-4 pt-1 text-zinc-100">
        <span className="text-xs lowercase">{language}</span>
        <div className="flex flex-row items-center">
          <Button
            variant="ghost"
            className="hover:bg-zinc-600 hover:text-white focus-visible:ring-1 focus-visible:ring-slate-700 focus-visible:ring-offset-0"
            onClick={downloadAsFile}
            size="icon"
            aria-label={t('common.download')}
          >
            <DownloadIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-xs hover:bg-zinc-600 hover:text-white focus-visible:ring-1 focus-visible:ring-slate-700 focus-visible:ring-offset-0"
            onClick={onCopy}
            aria-label={t('common.download')}
          >
            {isCopied ? (
              <CheckIcon className="h-4 w-4" />
            ) : (
              <ClipboardCopyIcon className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        PreTag="div"
        customStyle={{
          width: '100%',
          maxWidth: 'calc(100vw - 80px)',
          borderRadius: '0 0 1rem 1rem',
          height: 'auto',
        }}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  )
})
CodeBlock.displayName = 'CodeBlock'

export { CodeBlock }
