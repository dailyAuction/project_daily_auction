import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { signoutAPI } from '../../../api/signoutAPI';
import { resetUserInfoHook } from '../../../hooks/useResetUserInfo';

type SignOutModalProps = {
  handleClose: () => void;
};

export const SignOutModal = ({ handleClose }: SignOutModalProps) => {
  const navigate = useNavigate();
  const { resetUser } = resetUserInfoHook();

  const { mutate: signOutOk } = useMutation(
    () => {
      return signoutAPI.patch();
    },
    {
      onSuccess: () => {
        resetUser();
        navigate('/');
      },
      onError: (error) => {
        console.log('회원탈퇴 실패 : ', error);
      },
    }
  );

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
          <button type="submit" className="white-btn" onClick={() => signOutOk()}>
            예
          </button>
          <button type="button" className="red-btn" onClick={handleClose}>
            아니오
          </button>
        </article>
      </div>
    </section>
  );
};
