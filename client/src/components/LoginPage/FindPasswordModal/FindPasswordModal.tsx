/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { loginAPI } from '../../../api/loginAPI';
import { REG_EMAIL } from '../../../constants/constants';
import { userIdPassword } from '../../../mock/userIdPassword';

type LeaveModalProps = {
  handleClose: () => void;
};

type EmailData = {
  email: string;
};

export const FindPasswordModal = ({ handleClose }: LeaveModalProps) => {
  const [isUser, setIsUser] = useState(true);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<EmailData>();

  const {
    mutate: postForgotPassword,
    isError: emailAuthFail,
    isSuccess: emailAuthSuccess,
  } = useMutation((email: string) => {
    return loginAPI.postForgotPassword(email);
  });

  // TODO : 이메일 전송 이벤트 추가.
  const onSubmit = handleSubmit(() => {
    const { email } = getValues();
    postForgotPassword(email);

    /* 
      TODO
      1. email이 회원 가입된 아이디인지 확인.
        a. 안되어 있을 경우 회원가입 되어있지 않습니다 안내.
        b. 되어있을 경우 이메일로 비밀번호 전달.
    */
    // if(emailAuthFail){
    //   setIsUser(false);
    // }
    // if(emailAuthSuccess){
    //   setIsUser(true);
    //   handleClose();
    // }

    // 테스트용 전송 이벤트
    if (userIdPassword.email !== email) {
      setIsUser(false);
    } else {
      handleClose();
    }
  });

  return (
    <section className="bg-modal">
      <div className="modal-container space-y-12 items-center py-5">
        <article className="flex flex-col items-center text-base space-y-3">
          <span className="text-lg font-bold">비밀번호 찾기</span>
          <span>가입한 이메일 주소로 임시 비밀번호를 보내드립니다. 로그인 후 비밀번호를 꼭 변경해주세요.</span>
        </article>
        <form onSubmit={onSubmit}>
          <article className="w-full flex flex-col justify-center  ">
            <input
              type="email"
              placeholder="이메일"
              className="input"
              {...register('email', {
                required: true,
                pattern: {
                  value: REG_EMAIL,
                  message: '이메일 형식으로 입력해주세요.',
                },
              })}
            />
            <p className="text-xs m-1 text-[#FF0000]">
              {errors.email?.type === 'required' && '이메일을 입력해주세요'}
              {errors.email?.type === 'pattern' && errors.email?.message}
              {!isUser && '가입되어 있지 않은 이메일 입니다.'}
            </p>
            <div className="flex flex-col justify-center items-center space-y-3 mt-7">
              <button type="submit" className="white-btn w-fit">
                전송
              </button>
              <button type="button" onClick={handleClose} className="font-normal hover:text-main-red">
                비밀번호가 기억났어요 &gt;
              </button>
            </div>
          </article>
        </form>
      </div>
    </section>
  );
};
