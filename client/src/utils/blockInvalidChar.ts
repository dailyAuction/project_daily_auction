import React from 'react';

// FIXME: 한글 문자, e 문자 눌리는 것 완정 방지하도록 수정
export const blockInvalidChar = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Process') e.preventDefault();
};
