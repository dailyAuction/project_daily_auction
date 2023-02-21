/* eslint-disable react/jsx-props-no-spreading */
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { FindPasswordModal } from '../FindPasswordModal/FindPasswordModal';
import { REG_EMAIL, REG_PASSWORD } from '../../../constants/constants';
import { MemberAuthData } from '../../../types/member.type';
import { loginAPI } from '../../../api/loginAPI';
import { accessTokenAtom, refreshTokenAtom } from '../../../atoms/token';
import { loginStateAtom, userInfoAtom } from '../../../atoms/user';

type LoginData = MemberAuthData;

export const Login = () => {
  const [isCorrect, setIsCorrect] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [, setAccessToken] = useRecoilState(accessTokenAtom);
  const [, setRefreshToken] = useRecoilState(refreshTokenAtom);
  const [, setUserInfo] = useRecoilState(userInfoAtom);
  const [, setLoginState] = useRecoilState(loginStateAtom);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const { mutate: postLogin } = useMutation(
    (loginData: LoginData) => {
      return loginAPI.post(loginData);
    },
    {
      onSuccess: (res) => {
        setAccessToken(res.accesstoken);
        setRefreshToken(res.refreshtoken);
        setUserInfo({
          memberId: Number(res.memberid),
          coin: res.coin,
          email: res.email,
        });
        setLoginState(true);
        navigate(-1);
      },
      onError: (error) => {
        console.log('Login error : ', error);
        setIsCorrect(false);
      },
    }
  );

  const onSubmit = handleSubmit((data: LoginData) => {
    postLogin(data);
  });

  return (
    <main className="w-full flex flex-col mt-11 items-center space-y-5">
      <section className="space-y-7 w-4/5">
        <form className="space-y-2" onSubmit={onSubmit}>
          <article>
            <label className="text-sm">이메일</label>
            <input
              className="input"
              type="email"
              placeholder="이메일"
              {...register('email', {
                required: true,
                pattern: {
                  value: REG_EMAIL,
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
            <label className="text-sm">비밀번호</label>
            <input
              className="input"
              type="password"
              placeholder="비밀번호"
              {...register('password', {
                required: true,
                // pattern: {
                //   value: REG_PASSWORD,
                //   message: '비밀번호를 8자 이상으로 숫자, 영문, 특수기호를 조합해서 사용하세요.',
                // },
              })}
            />
            <p className="text-xs text-[#FF0000]">
              {errors.password?.type === 'required' && '비밀번호를 입력해주세요'}
              {/* {errors.password?.type === 'pattern' && errors.password?.message} */}
            </p>
          </article>
          <article>
            {/* TODO : 로그인 맞는지 확인 후 로직에 따라 나타남. */}
            <p className="text-xs text-[#FF0000]">{!isCorrect && '아이디 또는 비밀번호가 일치하지 않습니다.'}</p>
          </article>
          <article>
            <button type="submit" className="w-full text-base mt-5 py-1.5 bg-border-color rounded-[10px]">
              로그인
            </button>
          </article>
        </form>

        <article className="flex flex-col justify-center items-center space-y-2 text-sm">
          <span>
            아직 회원이 아니신가요?
            <Link to="/signup" className="ml-3 text-main-red">
              회원가입
            </Link>
          </span>
          <button type="button" className="hover:text-main-red" onClick={() => setModalOpen(true)}>
            비밀번호를 잊어버렸어요 &gt;
          </button>
        </article>
      </section>
      <section className="w-fit pt-12 flex space-x-4 justify-between">
        <img src="/socialLogin/google_login.png" alt="google_login" className="h-10 cursor-pointer" />
        <img src="/socialLogin/kakao_login.png" alt="kakao_login" className="h-10 cursor-pointer" />
      </section>
      <section>{isModalOpen && <FindPasswordModal handleClose={() => setModalOpen(false)} />}</section>
    </main>
  );
};
