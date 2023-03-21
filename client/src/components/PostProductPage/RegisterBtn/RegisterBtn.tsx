import { useState } from 'react';

export const RegisterBtn = ({ valid, setValid, handleClickBtn }) => {
  const [isClick, setIsClick] = useState(false);
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
    if (count > 0) setIsClick(true);
  };

  return (
    <>
      <button type="button" className="red-btn m-2 ml-auto mb-20" onClick={handleClickBtn}>
        등록
      </button>
      {valid && (
        <div className="bg-modal">
          <div className="modal-container justify-center items-center gap-10">
            <span className="font-bold text-lg">경고</span>
            <span>한 번 등록하면 경매가 종료되기 전까지 게시글을 수정할 수 없습니다. 등록하시겠습니까?</span>
            <div className="w-full flex justify-center gap-3 font-bold">
              <button type="submit" className="white-btn" onClick={handleClick} disabled={isClick}>
                예
              </button>
              <button type="button" className="white-btn" onClick={() => setValid(false)}>
                아니오
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
