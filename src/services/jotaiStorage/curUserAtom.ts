import {tUserResponse} from '@hooks/user/user.interface';
import {atom} from 'jotai';

export const curUserAtom = atom<tUserResponse | undefined>(undefined);
