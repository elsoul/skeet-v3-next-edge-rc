import { Link } from '@/navigation'
import Image from 'next/image'
import { logoHorizontal, logoHorizontalInvert } from '@/assets/img'
import { blurDataURL, cn } from '@/lib/utils'
import { appInfo } from '@/app/config'

type Props = {
  className?: string
  href?: string
  onClick?: () => void
}

export default function LogoHorizontalLink({
  className,
  href = '/',
  ...rest
}: Props) {
  return (
    <>
      <Link href={href} {...rest}>
        <span className="sr-only">{appInfo.title}</span>
        <Image
          src={logoHorizontal}
          alt={appInfo.title}
          className={cn('hover:opacity-80 dark:hidden', className)}
          unoptimized
          placeholder="blur"
          blurDataURL={blurDataURL}
        />
        <Image
          src={logoHorizontalInvert}
          alt={appInfo.title}
          className={cn('hidden hover:opacity-80 dark:block', className)}
          unoptimized
          placeholder="blur"
          blurDataURL={blurDataURL}
        />
      </Link>
    </>
  )
}
