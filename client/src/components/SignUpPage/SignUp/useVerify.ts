import { useMutation } from 'react-query';
import { SetStateAction } from 'react';
import { signupAPI } from '../../../api/signupAPI';
import { REG_EMAIL } from '../../../constants/constants';

type UseVerifyFactor = {
  email?: string;
  setModalOpen?: React.Dispatch<SetStateAction<boolean>>;
  verifyForm?: {
    verifyCode?: string;
  };
  setVerifyForm?: React.Dispatch<SetStateAction<object>>;
};

export const useVerify = ({ email, setModalOpen, verifyForm, setVerifyForm }: UseVerifyFactor) => {
  const {
    mutate: getVerify,
    isError: verifyError,
    isSuccess: verifySuccess,
    data: verifyCodeResp,
  } = useMutation((postEmail: string) => {
    return signupAPI.postVerified(postEmail);
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
    // TODO : 테스트용 삭제 필수
    console.log(verifyForm.verifyCode, verifyCodeResp);
    if (verifyForm.verifyCode === verifyCodeResp) {
      setVerifyForm((prev) => ({ ...prev, verify: true }));
    } else {
      setVerifyForm((prev) => ({ ...prev, verify: false }));
    }
  };

  return { getAuthVerify, handleVerify, verifyError, verifySuccess };
};
