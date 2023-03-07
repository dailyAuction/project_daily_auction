import { useNavigate } from 'react-router-dom';

type SuccessModalProps = {
  handleClose: () => void;
  modalName: string;
  routeName: string;
  detail?: string;
};

export const SuccessModal = ({ handleClose, modalName, routeName, detail }: SuccessModalProps) => {
  const navigate = useNavigate();
  const handleCloseModal = () => {
    handleClose();
    navigate(routeName);
  };

  return (
    <section className="bg-modal">
      <div className="modal-container justify-around items-center py-5">
        <span className="text-lg font-bold text-main-brown">{modalName}</span>
        {detail && (
          <article className="flex flex-col items-center text-base">
            <span>{detail}</span>
          </article>
        )}
        <article className="w-full flex justify-around font-bold">
          <button type="button" className="red-btn" onClick={handleCloseModal}>
            확인
          </button>
        </article>
      </div>
    </section>
  );
};
