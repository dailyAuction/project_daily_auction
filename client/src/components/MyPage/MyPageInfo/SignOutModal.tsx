type SignOutModalProps = {
  handleClose: () => void;
};

export const SignOutModal = ({ handleClose }: SignOutModalProps) => {
  return (
    <section className="bg-modal">
      <div className="modal-container justify-around items-center py-5">
        <span className="text-lg font-bold">회원탈퇴</span>
        <article className="flex flex-col items-center text-base">
          <p>남은 예치금은 탈퇴시 소멸됩니다.</p>
          <p>
            정말 <span className="text-main-red font-bold">탈퇴</span>하시겠습니까?
          </p>
        </article>
        <article className="w-full flex justify-around font-bold">
          <button type="submit" className="white-btn">
            예
          </button>
          <button type="submit" className="red-btn" onClick={handleClose}>
            아니오
          </button>
        </article>
      </div>
    </section>
  );
};
