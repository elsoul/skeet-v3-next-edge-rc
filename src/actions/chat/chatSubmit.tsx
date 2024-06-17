'use server'

import { getMutableAIState, streamUI, createStreamableValue } from 'ai/rsc'
import { openai } from '@ai-sdk/openai'

import { SpinnerMessage, BotMessage } from './chatMessages'
import { AI } from './chatProvider'

export async function submitUserMessage(content: string) {
  const aiState = getMutableAIState<typeof AI>()

  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: '',
        chatId: '',
        role: 'user',
        content,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  })

  let textStream: undefined | ReturnType<typeof createStreamableValue<string>>
  let textNode: undefined | React.ReactNode

  const result = await streamUI({
    model: openai('gpt-3.5-turbo'),
    initial: <SpinnerMessage />,
    system: `\
    An assistant who knows everything and teaches politely. If I don't know, I will research before answering.`,
    messages: [
      ...aiState.get().messages.map((message: any) => ({
        role: message.role,
        content: message.content,
        name: message.name,
      })),
    ],
    text: ({ content, done, delta }) => {
      if (!textStream) {
        textStream = createStreamableValue('')
        textNode = <BotMessage content={textStream.value} />
      }

      if (done) {
        textStream.done()
        aiState.done({
          ...aiState.get(),
          messages: [
            ...aiState.get().messages,
            {
              id: '',
              chatId: '',
              role: 'assistant',
              content,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
        })
      } else {
        textStream.update(delta)
      }

      return textNode
    },
  })

  return {
    id: '',
    display: result.value,
  }
}
