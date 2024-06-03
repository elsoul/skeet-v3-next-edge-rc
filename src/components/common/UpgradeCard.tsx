import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function UpgradeCard() {
  const t = useTranslations()
  return (
    <>
      <Card>
        <CardHeader className="p-4">
          <CardTitle>{t('User.upgradeCardTitle')}</CardTitle>
          <CardDescription>{t('User.upgradeCardDescription')}</CardDescription>
        </CardHeader>
        <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
          <Link
            href="https://discord.gg/H2HeqRq54J"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="sm" className="w-full">
              {t('User.upgrade')}
            </Button>
          </Link>
        </CardContent>
      </Card>
    </>
  )
}
