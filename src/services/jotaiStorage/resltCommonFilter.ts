import {tResponseResult} from '@hooks/response/response.interface'
import {atom} from 'jotai'

export const resultCommonFilterAtom = atom<tResponseResult | undefined>(
  undefined,
)
