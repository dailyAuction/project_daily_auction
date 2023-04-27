import { setLocalStorage, removeLocalStorage, getLocalStorage } from '../hooks/useLocalStorage';

export const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const savedValue = getLocalStorage(key);
    if (savedValue != null) {
      setSelf(savedValue);
    }

    onSet((newValue: any, _: any, isReset: boolean) => {
      if (isReset) {
        removeLocalStorage(key);
      } else {
        setLocalStorage(key, newValue);
      }
    });
  };
