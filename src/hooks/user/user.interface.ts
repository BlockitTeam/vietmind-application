export type tUserResponse = {
  birthYear: string | null
  enabled: boolean
  firstName: string | null
  gender: 'MALE' | 'FEMALE' | 'OTHER' | null
  id: string
  lastName: string | ''
  password: string | null
  provider: string
  surveyCompleted: boolean
  roles: string[]
  username: string
  surveyDetail: null | number
  latestSpecializedVersion: null | string
}
export type tPutEditUserParam = {
  firstName: string
  lastName: string
  birthYear: number
  gender: 'MALE' | 'FEMALE' | 'OTHER'
}

export type tDoctorResponse = {
  id: string
  username: string
  firstName: string
  lastName: string
  birthYear: number
  gender: string
  // conversationId: null;
}
