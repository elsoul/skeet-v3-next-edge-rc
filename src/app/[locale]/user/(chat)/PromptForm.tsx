'use client'

import { useRef, useEffect, useTransition } from 'react'
import Textarea from 'react-textarea-autosize'

import { useActions, useUIState } from 'ai/rsc'
import { AI } from '@/actions/chat/chatProvider'
import { Button } from '@/components/ui/button'

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useEnterSubmit } from '@/hooks/utils/useEnterSubmit'

import { ArrowUpIcon } from '@radix-ui/react-icons'

import { useToast } from '@/components/ui/use-toast'
import { useTranslations } from 'next-intl'
import { UserMessage } from '@/actions/chat/chatMessages'

export function PromptForm({
  input,
  setInput,
}: {
  input: string
  setInput: (value: string) => void
}) {
  const t = useTranslations()
  const { formRef, onKeyDown } = useEnterSubmit()
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [isPending, startTransition] = useTransition()
  const [_, setMessages] = useUIState<typeof AI>()
  const { toast } = useToast()
  const { submitUserMessage } = useActions()

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const submitAction = async (formData: FormData) => {
    startTransition(async () => {
      try {
        setMessages((currentMessages) => [
          ...currentMessages,
          {
            id: '',
            display: (
              <UserMessage>{formData.get('message') as string}</UserMessage>
            ),
          },
        ])
        const responseMessage = await submitUserMessage(
          formData.get('message') as string,
        )
        setInput('')
        setMessages((currentMessages) => [...currentMessages, responseMessage])
      } catch (e) {
        if (e instanceof Error) {
          toast({
            title: t('Chat.sendMessageErrorTitle'),
            description: t('Chat.sendMessageErrorDescription'),
          })
        }
      }
    })
  }

  return (
    <form ref={formRef} action={submitAction}>
      <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background pr-8 sm:rounded-md sm:border sm:pr-12">
        <Textarea
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          placeholder={t('Chat.askMeAnything')}
          className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
          autoFocus
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          name="message"
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="absolute bottom-3 right-0 sm:right-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="submit"
                size="icon"
                disabled={input === '' || isPending}
              >
                <ArrowUpIcon className="h-6 w-6" />
                <span className="sr-only">{t('Chat.sendMessage')}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t('Chat.sendMessage')}</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </form>
  )
}
