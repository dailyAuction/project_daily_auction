type CheckModalProps = {
  handleClose: () => void;
};

export const AuthModal = ({ handleClose }: CheckModalProps) => {
  return (
    <section className="bg-modal">
      <div className="modal-container justify-around items-center py-5">
        <span className="text-lg font-bold">이메일 인증 요청</span>
        <article className="flex flex-col items-center text-base">
          <span>입력하신 이메일로 인증 코드를 보냈습니다.</span>
          <span>이메일을 확인해주세요.</span>
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
