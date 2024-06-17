import { useRef, type RefObject, type KeyboardEvent } from 'react'

export function useEnterSubmit(): {
  formRef: RefObject<HTMLFormElement | null>
  onKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void
} {
  const formRef = useRef<HTMLFormElement | null>(null)

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>): void => {
    if (
      event.key === 'Enter' &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      formRef.current?.requestSubmit()
      event.preventDefault()
    }
  }

  return { formRef, onKeyDown: handleKeyDown }
}
