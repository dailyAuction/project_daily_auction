/* eslint-disable react/jsx-props-no-spreading */

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { AuthModal } from '../SignUpModal/AuthModal';
import { REG_EMAIL, REG_PASSWORD } from '../../../constants/constants';
import { MemberAuthData } from '../../../types/member.type';
import { signupAPI } from '../../../api/signupAPI';
import { useVerify } from './useVerify';

type SignUpData = MemberAuthData;

type SignUpConfirmData = {
  confirmPassword: string;
} & MemberAuthData;

type VerifyFormData = {
  verify: boolean;
  verifyEmailReg: 1 | 0 | -1;
  verifyCode: string;
};

export const SignUp = () => {
  const navigate = useNavigate();

  const [isModalOpen, setModalOpen] = useState(false);
  const [isAgreeCheck, setIsAgreeCheck] = useState(false);

  const [verifyForm, setVerifyForm] = useState<VerifyFormData>({
    verify: false,
    verifyEmailReg: 0,
    verifyCode: '',
  });

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<SignUpConfirmData>();
  const email = watch('email');

  // TODO : verfySuccess로 모달 창 open으로 수정 - 성공시 isModalOpen 삭제
  const { getAuthVerify, handleVerify, verifyError, veifySuccess } = useVerify({
    email,
    setModalOpen,
    verifyForm,
    setVerifyForm,
  });

  const { mutate: postSignUp } = useMutation((signUpData: SignUpData) => {
    return signupAPI.post(signUpData);
  });

  const onSubmit = handleSubmit((data: SignUpConfirmData) => {
    const signUpData: SignUpData = { email: data.email, password: data.password };
    if (data.password !== data.confirmPassword) {
      setError('confirmPassword', { message: '비밀번호가 일치하지 않습니다.' }, { shouldFocus: true });
    } else {
      postSignUp(signUpData);
      navigate('/login');
    }
  });

  const handleVerifyCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setVerifyForm((prev) => ({ ...prev, verifyCode: target.value }));
  };

  return (
    <>
      <main className="w-full flex flex-col mt-11 items-center space-y-5">
        <section className="space-y-7 w-4/5">
          <form className="space-y-2" onSubmit={onSubmit}>
            <article>
              <span className="text-sm">이메일</span>
              <div className="flex space-x-2">
                <input
                  id="email"
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
                {/* TODO : 인증코드 요청 로직 필요 */}
                <button type="button" className="white-btn w-2/6" onClick={getAuthVerify}>
                  요청
                </button>
              </div>
              <p className="text-xs text-[#FF0000]">
                {errors.email?.type === 'required' && '이메일을 입력해주세요'}
                {errors.email?.type === 'pattern' && errors.email?.message}
              </p>
              <p className="text-xs text-[#FF0000]">
                {verifyForm.verifyEmailReg === -1 && '이메일 형식으로 입력해주세요'}
              </p>
            </article>
            <article>
              <span className="text-sm">인증번호</span>
              <div className="flex space-x-2">
                <input type="text" className="input" placeholder="인증번호" onChange={handleVerifyCode} />
                {/* TODO : 인증코드 확인 로직 필요 */}
                <button type="button" className="white-btn w-2/6" onClick={handleVerify}>
                  인증
                </button>
              </div>
              <p className={`text-xs ${verifyForm.verify ? 'text-blue-600' : 'text-[#FF0000]'}`}>
                {verifyForm.verify ? '인증에 성공하였습니다.' : '인증번호를 입력해주세요.'}
              </p>
            </article>
            <article>
              <span className="text-sm">비밀번호</span>
              <span className="text-xs ml-2 opacity-50">숫자, 영문, 특수문자를 포함해 8자리 이상</span>
              <input
                id="password"
                type="password"
                placeholder="비밀번호"
                className="input"
                {...register('password', {
                  required: true,
                  pattern: {
                    value: REG_PASSWORD,
                    message: '숫자, 영문, 특수문자를 포함해 8자리 이상이어야 합니다.',
                  },
                })}
              />
              <p className="text-xs text-[#FF0000]">
                {errors?.password?.type === 'required' && '비밀번호를 입력해주세요'}
                {errors?.password?.type === 'pattern' && errors?.password?.message}
              </p>
            </article>
            <article>
              <span className="text-sm">비밀번호 확인</span>
              <input
                id="confirmPassword"
                type="password"
                placeholder="비밀번호 확인"
                className="input"
                {...register('confirmPassword', {
                  required: true,
                  pattern: REG_PASSWORD,
                })}
              />
              <p className="text-xs text-[#FF0000]">
                {errors?.confirmPassword?.type === 'required' && '비밀번호를 재입력해주세요'}
                {errors?.confirmPassword?.type === 'pattern' && '비밀번호를 올바르게 입력해주세요'}
                {errors?.confirmPassword?.message}
              </p>
            </article>
            <article className="text-sm flex flex-row pt-5">
              <input type="checkbox" className="mx-4" onClick={() => setIsAgreeCheck(!isAgreeCheck)} />
              <article className="opacity-60">
                {/* TODO : 이용약관 페이지 추가 작업 */}
                <span className="underline underline-offset-1 cursor-pointer">이용약관</span>
                <span>을 모두 확인하였으며 이에 동의하는 것으로 간주합니다.</span>
              </article>
            </article>
            <button
              type="submit"
              className={`w-full text-base mt-4 py-1.5 bg-border-color rounded-[10px] ${
                isAgreeCheck === true && verifyForm.verify === true ? '' : 'opacity-40 pointer-events-none'
              }`}>
              회원가입
            </button>
          </form>

          <article className="flex flex-col justify-center items-center space-y-2 text-sm">
            <span>
              이미 회원이신가요?
              <Link to="/login" className=" ml-3 text-main-red">
                로그인
              </Link>
            </span>
          </article>
        </section>
      </main>
      {isModalOpen ? <AuthModal verifyError={verifyError} handleClose={() => setModalOpen(false)} /> : <></>}
    </>
  );
};
