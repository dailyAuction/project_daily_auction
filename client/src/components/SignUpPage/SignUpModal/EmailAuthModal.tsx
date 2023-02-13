import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type LeaveModalProps = {
  handleClose: () => void;
};

export const EmailAuthModal = ({ handleClose }: LeaveModalProps) => {
  const [authData, setAuthData] = useState('');
  const [isAuth, setIsAuth] = useState(true);
  const navigate = useNavigate();

  const onSubmit = () => {
    // 여기서만 쓸 mock 데이터
    const AUTH_DATA = '111111';

    if (AUTH_DATA === authData) {
      console.log(authData);
      setIsAuth(true);
      handleClose();
      navigate('/login');
    } else {
      setIsAuth(false);
    }
  };

  return (
    <section className="bg-modal">
      <div className="modal-container space-y-12 items-center py-5">
        <article className="flex flex-col items-center text-base space-y-3">
          <span className="text-lg font-bold">이메일 인증</span>
          <span>인증 번호가 메일 주소로 전송되었습니다. 인증번호를 입력해주세요.</span>
        </article>
        <article className="w-full flex flex-col justify-center  ">
          <input type="email" placeholder="인증번호" className="input" onChange={(e) => setAuthData(e.target.value)} />
          {!isAuth && <p className="text-xs m-1 text-[#FF0000]">인증번호가 틀렸습니다.</p>}
        </article>
        <button type="button" className="white-btn" onClick={() => onSubmit()}>
          제출
        </button>
      </div>
    </section>
  );
};
