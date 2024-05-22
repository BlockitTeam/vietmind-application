import {atom} from 'jotai';

export type tCurUser = {
  username: string;
  avatar: string;
  tokenId: string;
};

export const curUserAtom = atom<tCurUser | undefined>(undefined);
