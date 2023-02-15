import React from 'react';

export const blockInvalidChar = (e: React.KeyboardEvent) => {
  // 백스페이스, 한글, 문자 제외 숫자만 입력 가능
  if (/[a-z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣|+|-]/g.test(e.key) && e.key !== 'Backspace') e.preventDefault();
};
