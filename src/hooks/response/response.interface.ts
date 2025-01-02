export type tResponse = {
  createdAt: string
  optionId: number
  responseId: number
  surveyId: number
  updatedAt: string
  userId: number
}

export type tResponseResult = {
  PTSD: string
  'Lo Âu': string
  'Giấc ngủ': string
  'Trầm Cảm': string
  Stress: string
  type: 'good' | 'bad'
}
