/* eslint-disable react/jsx-props-no-spreading */

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { EmailAuthModal } from '../SignUpModal/EmailAuthModal';

interface SignUpData {
  email: string;
  password: string;
  confirmPassword: string;
}

export const SignUp = () => {
  const [isConfirm, setIsConfirm] = useState(true);
  const [isCheck, setIsCheck] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpData>();

  const onSubmit = handleSubmit((data: SignUpData) => {
    // confirm data가 같은지 확인.
    if (data.password !== data.confirmPassword) {
      setIsConfirm(false);
    } else {
      setModalOpen(true);
      setIsConfirm(true);
    }
  });

  return (
    <main className="w-full flex flex-col mt-11 items-center space-y-5">
      <section className="space-y-7 w-3/5">
        {/* TODO : 유효성 검사 기능 추가 */}
        <form className="space-y-2" onSubmit={onSubmit}>
          <article>
            <span className="text-sm">이메일</span>
            <input
              type="email"
              placeholder="이메일"
              className="input"
              {...register('email', {
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: '이메일 형식으로 입력해주세요.',
                },
              })}
            />
            <p className="text-xs text-[#FF0000]">
              {errors.email?.type === 'required' && '이메일을 입력해주세요'}
              {errors.email?.type === 'pattern' && errors.email?.message}
            </p>
          </article>
          <article>
            <span className="text-sm">비밀번호</span>
            <input
              type="password"
              placeholder="비밀번호"
              className="input"
              {...register('password', {
                required: true,
                pattern: {
                  value: /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                  message: '숫자, 영문, 특수문자를 포함해 8자리 이상이어야 합니다.',
                },
              })}
            />
            <p className="text-xs text-[#FF0000]">숫자, 영문, 특수문자를 포함해 8자리 이상이어야 합니다.</p>
            <p className="text-xs text-[#FF0000]">
              {errors.password?.type === 'required' && '비밀번호를 입력해주세요'}
            </p>
          </article>
          <article>
            <span className="text-sm">비밀번호 확인</span>
            <input
              type="password"
              placeholder="비밀번호 확인"
              className="input"
              {...register('confirmPassword', {
                required: true,
                pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
              })}
            />
            <p className="text-xs text-[#FF0000]">
              {errors.confirmPassword?.type === 'required' && '비밀번호를 재입력해주세요'}
            </p>
            {!isConfirm && <p className="text-xs text-[#FF0000]">비밀번호가 일치하지 않습니다.</p>}
          </article>
          <article className="text-sm flex flex-row pt-5">
            <input type="checkbox" className="mx-4" onClick={() => setIsCheck(!isCheck)} />
            <article className="opacity-60">
              {/* TODO : 이용약관 페이지 추가 작업 */}
              <span className="underline underline-offset-1 cursor-pointer">이용약관</span>을 모두 확인하였으며 이에
              동의하는 것으로 간주합니다.
            </article>
          </article>
          <button
            type="submit"
            className={`w-full text-base mt-4 py-1.5 bg-border-color rounded-[10px] ${
              !isCheck && 'opacity-40 pointer-events-none'
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
      <section>{isModalOpen && <EmailAuthModal handleClose={() => setModalOpen(false)} />}</section>
    </main>
  );
};
