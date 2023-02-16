type CheckModalProps = {
  handleClose: () => void;
};

export const AuthModal = (verifyError, { handleClose }: CheckModalProps) => {
  return (
    <section className="bg-modal">
      <div className="modal-container justify-around items-center py-5">
        <span className="text-lg font-bold">{verifyError ? '가입된 이메일' : '이메일 인증 요청'}</span>
        <article className="flex flex-col items-center text-base">
          <span>
            {verifyError
              ? '해당 이메일은 이미 가입되어 있습니다. 로그인을 해주세요.'
              : '입력하신 이메일로 인증 코드를 보냈습니다. 이메일을 확인해주세요.'}
          </span>
        </article>
        <article className="w-full flex justify-around font-bold">
          <button
            type="button"
            className="red-btn"
            onClick={() => {
              handleClose();
            }}>
            확인
          </button>
        </article>
      </div>
    </section>
  );
};
