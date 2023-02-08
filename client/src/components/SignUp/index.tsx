import { Link } from 'react-router-dom';

export const SignUp = () => {
  return (
    <main className="w-full h-full flex flex-col mt-11 items-center space-y-5">
      <section className="space-y-7 w-3/5">
        {/* TODO : 유효성 검사 기능 추가 */}
        <form className="space-y-2 ">
          <article>
            <span className="text-sm">이메일</span>
            <input type="email" placeholder="이메일" className="input" />
          </article>
          <article>
            <span className="text-sm">비밀번호</span>
            <input type="password" placeholder="비밀번호" className="input" />
          </article>
          <article>
            <span className="text-sm">비밀번호 확인</span>
            <input type="password" placeholder="비밀번호 확인" className="input" />
          </article>
        </form>
        <article className="text-sm flex flex-row mt-5">
          <input type="checkbox" className="mx-4" />
          <article className="opacity-60">
            {/* TODO : 이용약관 페이지 추가 작업 */}
            <span className="underline underline-offset-1 cursor-pointer">이용약관</span>을 모두 확인하였으며 이에
            동의하는 것으로 간주합니다.
          </article>
        </article>
        <button type="submit" className="w-full text-base mt-4 py-1.5 bg-border-color rounded-[10px]">
          회원가입
        </button>
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
  );
};
