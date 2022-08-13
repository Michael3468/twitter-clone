import { atom, RecoilState } from 'recoil';

export const modalState: RecoilState<boolean> = atom({
  key: 'modalState',
  default: false,
});

export const postIdState: RecoilState<string> = atom({
  key: 'postIdState',
  default: '',
});
