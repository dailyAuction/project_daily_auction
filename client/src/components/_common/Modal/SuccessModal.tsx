import { useNavigate } from 'react-router-dom';

type SuccessModalProps = {
  handleClose: () => void;
  modalName: string;
  routeName: string;
};

export const SuccessModal = ({ handleClose, modalName, routeName }: SuccessModalProps) => {
  const navigate = useNavigate();

  return (
    <section className="bg-modal">
      <div className="modal-container justify-around items-center py-5">
        <span className="text-lg font-bold text-main-brown">{modalName}</span>
        <article className="w-full flex justify-around font-bold">
          <button
            type="button"
            className="red-btn"
            onClick={() => {
              handleClose();
              navigate(routeName);
            }}>
            확인
          </button>
        </article>
      </div>
    </section>
  );
};
