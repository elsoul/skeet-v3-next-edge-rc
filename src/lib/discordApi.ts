import appInfo from '@appInfo'

export const getAccessToken = async (
  code: string,
  clientId: string,
  clientSecret: string,
) => {
  const url = 'https://discord.com/api/oauth2/token'
  const redirect_uri =
    process.env.NODE_ENV === 'production'
      ? `https://${appInfo.domain}/user/discord-action`
      : 'http://localhost:4200/user/discord-action'
  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    code,
    grant_type: 'authorization_code',
    redirect_uri,
    scope: 'identify',
  }).toString()
  const response = await fetch(url, {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
  const json = await response.json()
  return json as OAuthResponse
}

export const getUserInfo = async (oauthData: OAuthResponse) => {
  const userResult = await fetch('https://discord.com/api/users/@me', {
    method: 'GET',
    headers: {
      authorization: `${oauthData.token_type} ${oauthData.access_token}`,
    },
  })
  const userJson = await userResult.json()
  return userJson as DiscordUserLogin
}

export type OAuthResponse = {
  access_token: string
  token_type: string
  expires_in: number
  refresh_token: string
  scope: string
}

export type DiscordUserLogin = {
  id: string
  username: string
  avatar: string
  discriminator: string
  public_flags: number
  flags: number
  banner: string
  accent_color: null | number
  global_name: string
  avatar_decoration_data: null
  banner_color: null | number
  mfa_enabled: boolean
  locale: string
  premium_type: number
  email: string
}
