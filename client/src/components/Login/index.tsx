import { Input } from '../Input';

export const Login = () => {
  return (
    <main className="w-full h-full flex flex-col mt-11 items-center space-y-5">
      <section className="space-y-2 w-3/5">
        <article>
          <span className="text-sm">이메일</span>
          <Input placeholder="이메일" />
        </article>
        <article>
          <span className="text-sm">비밀번호</span>
          <Input placeholder="비밀번호" />
        </article>
        {false ? null : <span className="text-xs text-[#FF0000]">정보가 일치하지 않습니다</span>}

        <button type="submit" className="w-full text-sm mt-4 py-1.5 bg-border-color rounded-[10px]">
          로그인
        </button>
        <article className="flex flex-col justify-center items-center space-y-2">
          <span>
            아직 회원이 아니신가요?
            <button type="button" className="ml-3 text-main-red">
              회원가입
            </button>
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
