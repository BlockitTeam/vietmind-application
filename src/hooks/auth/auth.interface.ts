export type tProvider = 'facebook' | 'google' | 'apple'

export type tLoginParam = {
  token: string | undefined
  provider: tProvider
}
