import { useMutation } from 'react-query';
import { SetStateAction } from 'react';
import { REG_EMAIL } from '../../../constants/constants';
import { verifedAPI } from '../../../api/verifyAPI';

type UseVerifyFactor = {
  email?: string;
  setModalOpen?: React.Dispatch<SetStateAction<boolean>>;
  verifyForm?: {
    verifyCode?: string;
  };
  setVerifyForm?: React.Dispatch<SetStateAction<object>>;
};

// 임시 인증번호 통신 가능시 삭제
const AUTH_DATA = '111111';

export const useVerify = ({ email, setModalOpen, verifyForm, setVerifyForm }: UseVerifyFactor) => {
  const {
    mutate: getVerify,
    isError: verifyError,
    // TODO : 통신시 인증코드 넘어오는지 확인
    data: verifyCode,
  } = useMutation((postEmail: string) => {
    return verifedAPI.post(postEmail);
  });

  const getAuthVerify = () => {
    if (REG_EMAIL.test(email)) {
      getVerify(email);
      setVerifyForm((prev) => ({ ...prev, verifyEmailReg: 1 }));
      setModalOpen(true);
    } else {
      setVerifyForm((prev) => ({ ...prev, verifyEmailReg: -1 }));
    }
  };

  const handleVerify = () => {
    if (verifyForm.verifyCode === AUTH_DATA) {
      setVerifyForm((prev) => ({ ...prev, verify: true }));
    } else {
      setVerifyForm((prev) => ({ ...prev, verify: false }));
    }
  };

  return { getAuthVerify, handleVerify, verifyError };
};
