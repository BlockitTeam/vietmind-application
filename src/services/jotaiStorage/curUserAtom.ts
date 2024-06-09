import {tUserResponse} from '@hooks/auth/auth.interface';
import {atom} from 'jotai';

export const curUserAtom = atom<tUserResponse | undefined>(undefined);
