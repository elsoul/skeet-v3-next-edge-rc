import DiscordLinking from './DiscordLinking'

import { getDataForPageByPageJsonName, PageProps } from '@/lib/pages'

const { generateMetadata } = getDataForPageByPageJsonName(
  'settings',
  'discordLink.title',
)
export { generateMetadata }

export default function DiscordActionPage({}: PageProps) {
  return (
    <>
      <DiscordLinking />
    </>
  )
}
