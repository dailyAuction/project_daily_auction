import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loginStateAtom } from '../../../atoms/user';

export const Login = () => {
  const [loginState, setLoginState] = useRecoilState(loginStateAtom);

  return (
    <main className="w-full flex flex-col mt-11 items-center space-y-5">
      <section className="space-y-7 w-3/5">
        {/* TODO : form 태그로 변경 */}
        <form className="space-y-2">
          <article>
            <span className="text-sm">이메일</span>
            <input className="input" type="email" placeholder="이메일" />
          </article>
          <article>
            <span className="text-sm">비밀번호</span>
            <input className="input" type="password" placeholder="비밀번호" />
          </article>
        </form>
        {/* TODO : 로그인 버튼 누를 시 로직 필요 */}
        {loginState ? null : <span className="text-xs text-[#FF0000]">정보가 일치하지 않습니다</span>}
        <Link to="/my" onClick={() => setLoginState(true)}>
          <button type="button" className="w-full text-base mt-4 py-1.5 bg-border-color rounded-[10px]">
            로그인
          </button>
        </Link>

        <article className="flex flex-col justify-center items-center space-y-2 text-sm">
          <span>
            아직 회원이 아니신가요?
            <Link to="/signup" className="ml-3 text-main-red">
              회원가입
            </Link>
          </span>
          <button type="button" className="hover:text-main-red">
            비밀번호를 잊어버렸어요 &gt;
          </button>
        </article>
      </section>
      <section className="w-fit pt-12 flex space-x-4 justify-between">
        <img src="/socialLogin/google_login.png" alt="google_login" className="h-10 cursor-pointer" />
        <img src="/socialLogin/kakao_login.png" alt="kakao_login" className="h-10 cursor-pointer" />
      </section>
    </main>
  );
};
