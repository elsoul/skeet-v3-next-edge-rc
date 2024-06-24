import { PromptForm } from './PromptForm'

import { useActions, useUIState } from 'ai/rsc'
import { AI } from '@/actions/chat/chatProvider'
import { UserMessage } from '@/actions/chat/chatMessages'
import { useTranslations } from 'next-intl'

export interface ChatPanelProps {
  id?: string
  title?: string
  input: string
  setInput: (value: string) => void
}

export function ChatPanel({ id, title, input, setInput }: ChatPanelProps) {
  const t = useTranslations()
  const [messages, setMessages] = useUIState<typeof AI>()
  const { submitUserMessage } = useActions()

  const exampleMessages = Array.from({ length: 4 }, (_, index) => ({
    heading: t(`Chat.examples.heading${index + 1}`),
    subheading: t(`Chat.examples.subheading${index + 1}`),
    message: t(`Chat.examples.message${index + 1}`),
  }))

  return (
    <div className="relative mt-auto w-full">
      <div className="mx-auto w-full max-w-2xl sm:px-4">
        <div className="mb-4 grid grid-cols-2 gap-2 px-4">
          {messages.length === 0 &&
            exampleMessages.map((example, index) => (
              <div
                key={example.heading}
                className={`cursor-pointer rounded-lg border bg-white p-4 hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900 ${
                  index > 1 && 'hidden md:block'
                }`}
                onClick={async () => {
                  setMessages((currentMessages) => [
                    ...currentMessages,
                    {
                      id: '',
                      display: <UserMessage>{example.message}</UserMessage>,
                    },
                  ])

                  const responseMessage = await submitUserMessage(
                    example.message,
                  )

                  setMessages((currentMessages) => [
                    ...currentMessages,
                    responseMessage,
                  ])
                }}
              >
                <div className="text-sm font-semibold">{example.heading}</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-300">
                  {example.subheading}
                </div>
              </div>
            ))}
        </div>

        <div className="space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
          <PromptForm input={input} setInput={setInput} />
        </div>
      </div>
    </div>
  )
}
