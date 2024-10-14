import { logoUrl } from '@/app/config'
import appInfo from '@appInfo'

export async function sendVerificationRequest(params: {
  identifier: string
  provider: { apiKey?: string; from: string }
  url: string
}) {
  const { identifier: to, provider, url } = params
  const { host } = new URL(url)
  if (!provider.apiKey) {
    throw new Error('API key is missing')
  }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${provider.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: provider.from,
      to,
      subject: `Sign in to ${host}`,
      html: html({ url, host }),
      text: text({ url, host }),
    }),
  })

  if (!res.ok)
    throw new Error('Resend error: ' + JSON.stringify(await res.json()))
}

function html(params: { url: string; host: string }) {
  const { url, host } = params

  const color = {
    background: 'white',
    text: '#1f2937', // Zinc-900
    secondaryText: '#4b5563', // Zinc-600
    tertiaryText: '#6b7280', // Zinc-400
    link: '#3b82f6', // Blue-500
    buttonBackground: 'linear-gradient(to bottom, #4b5563 0%, #1f2937 100%)',
    buttonText: 'white',
    footerBackground: '#f9fafb', // Zinc-50
    shadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    titleGradient: 'linear-gradient(to bottom, #6b7280, #1f2937)',
  }

  const escapedHost = host.replace(/\./g, '&#8203;.')

  return `
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
<body style="background-color: ${color.background}; font-family: 'Inter', Helvetica, sans-serif;">
  <div style="max-width: 600px; margin: auto; border: 1px solid #e5e7eb; border-radius: 0.375rem; overflow: hidden;">
    <!-- Logo is now a clickable link to the homepage -->
    <a href="https://${host}" target="_blank" style="display: block; text-align: center; margin: 80px auto 10px;">
      <img src="${logoUrl}" alt="Logo" style="width: 120px; height: auto;">
    </a>

    <div style="padding: 2rem; text-align: center;">
      <h1 style="color: transparent; font-size: 24px; background-image: ${color.titleGradient}; -webkit-background-clip: text; background-clip: text; letter-spacing: -0.02em;">Sign in to <strong>${escapedHost}</strong></h1>
      <p style="margin-top: 0.5rem; color: ${color.secondaryText}; font-size: 16px;">Click the button below to continue to your account.</p>

      <a href="${url}" target="_blank" style="background: ${color.buttonBackground}; color: ${color.buttonText}; padding: 0.8rem 1.5rem; margin-top: 1rem; display: inline-block; border-radius: 0.25rem; text-decoration: none; font-weight: bold; box-shadow: ${color.shadow}; font-size: 20px;">Sign in</a>

      <p style="margin-top: 1.5rem; color: ${color.tertiaryText}; font-size: 14px;">If you did not request this email, please ignore it.</p>
    </div>

    <div style="background-color: ${color.footerBackground}; padding: 1rem; text-align: center; font-size: 12px; color: ${color.secondaryText};">
      <p>&copy; ${new Date().getFullYear()} ${appInfo.copyright}</p>
      <a href="https://${host}" style="color: ${color.link}; text-decoration: none;">Visit our website</a>
    </div>
  </div>
</body>
`
}

function text({ url, host }: { url: string; host: string }) {
  return `Sign in to ${host}
Click the link below to sign in to your account:
${url}

If you did not request this email, you can safely ignore it.

© ${new Date().getFullYear()} ${appInfo.copyright}
Visit our website: https://${host}
`
}
