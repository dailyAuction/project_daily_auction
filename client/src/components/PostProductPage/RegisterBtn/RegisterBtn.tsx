import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const RegisterBtn = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const detailId = 1; // dummyPath

  return (
    <>
      <button type="submit" className="red-btn m-2 ml-auto mb-3" onClick={() => setModalOpen(true)}>
        등록
      </button>
      {modalOpen && (
        <div className="bg-modal">
          <div className="modal-container justify-center items-center gap-10">
            <span className="font-bold text-lg">경고</span>
            <span>한 번 등록하면 경매가 종료되기 전까지 게시글을 수정할 수 없습니다. 등록하시겠습니까?</span>
            <div className="w-full flex justify-center gap-3 font-bold">
              <button type="button" className="white-btn" onClick={() => navigate(`/detail/${detailId}`)}>
                예
              </button>
              <button type="button" className="white-btn" onClick={() => setModalOpen(false)}>
                아니오
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
