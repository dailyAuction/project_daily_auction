// 문자열을 원하는 길이로 잘라줍니다.
export const getShortString = (str: string, len: number) => {
  return str.length > len ? str.slice(0, len) + '...' : str;
};
