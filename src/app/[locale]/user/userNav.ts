import { ChatBubbleIcon, GearIcon } from '@radix-ui/react-icons'

export enum USER_PATHS {
  home = '/user',
  chat = '/user',
  settings = '/user/settings',
}

export const userNav = [
  {
    path: USER_PATHS.chat,
    label: 'AIChats.title',
    icon: ChatBubbleIcon,
  },
  {
    path: USER_PATHS.settings,
    label: 'Settings.title',
    icon: GearIcon,
  },
]
