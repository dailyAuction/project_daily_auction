/* eslint-disable react/jsx-props-no-spreading */

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useRecoilValue } from 'recoil';
import { editPasswordAPI } from '../../../api/editPasswordAPI';
import { accessTokenAtom } from '../../../atoms/token';
import { REG_KOREA, REG_PASSWORD } from '../../../constants/constants';
import { SuccessModal } from '../../_common/Modal/SuccessModal';
import { OpenPassword } from '../../_common/OpenPassword/OpenPassword';

type PasswordFactor = {
  currentPassword: string;
  newPassword: string;
};

type PasswordInputData = {
  confirmPassword: string;
} & PasswordFactor;

export const EditPassword = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const [openPassword, setOpenPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const accessToken = useRecoilValue(accessTokenAtom);

  // TODO : 비밀번호 변경 로직 분리하기
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<PasswordInputData>();

  const { mutate: postEditPassword, isError } = useMutation(
    (passwordData: PasswordFactor) => {
      const patchData: object = {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      };
      return editPasswordAPI.patch({ data: patchData, token: accessToken });
    },
    {
      onSuccess: () => {
        setModalOpen(true);
      },
      onError: (error) => {
        console.log('Change Password error : ', error);
      },
    }
  );

  const onSubmit = handleSubmit((data: PasswordInputData) => {
    if (data.newPassword !== data.confirmPassword) {
      setError('confirmPassword', { message: '비밀번호가 일치하지 않습니다.' }, { shouldFocus: true });
    } else if (data.newPassword === data.currentPassword) {
      setError(
        'newPassword',
        { message: '현재 비밀번호와 변경하실 비밀번호를 다르게 입력해주세요!' },
        { shouldFocus: true }
      );
    } else if (REG_KOREA.test(data.newPassword)) {
      setError(
        'newPassword',
        { message: '숫자, 영문, 특수문자를 포함해 8자리 이상을 입력해주세요' },
        { shouldFocus: true }
      );
    } else {
      postEditPassword({ currentPassword: data.currentPassword, newPassword: data.newPassword });
    }
  });

  return (
    <main className="w-full flex flex-col mt-5 items-center">
      <section className=" w-full p-[10px] bg-white">
        <form className="space-y-4" onSubmit={onSubmit}>
          <article>
            <span>현재 비밀번호</span>
            <div className="flex flex-row relative">
              <input
                type={openPassword.currentPassword ? 'text' : 'password'}
                className="input bg-background-mobile"
                autoComplete="off"
                placeholder="********"
                {...register('currentPassword', {
                  required: true,
                })}
              />
              <OpenPassword name="currentPassword" setOpenPassword={setOpenPassword} openPassword={openPassword} />
            </div>
            <p className="text-xs text-[#FF0000]">
              {isError && '비밀번호가 일치하지 않습니다.'}
              {errors?.currentPassword?.type === 'required' && '현재 비밀번호를 입력해주세요!'}
            </p>
          </article>
          <article>
            <span>변경할 비밀번호</span>
            <span className="text-xs ml-2 opacity-50">숫자, 영문, 특수문자를 포함해 8자리 이상</span>
            <div className="flex flex-row relative">
              <input
                type={openPassword.newPassword ? 'text' : 'password'}
                className="input bg-background-mobile"
                autoComplete="off"
                placeholder="********"
                {...register('newPassword', {
                  required: true,
                  pattern: REG_PASSWORD,
                })}
              />
              <OpenPassword name="newPassword" setOpenPassword={setOpenPassword} openPassword={openPassword} />
            </div>
            <p className="text-xs text-[#FF0000]">
              {errors?.newPassword?.type === 'required' && '비밀번호를 입력해주세요!'}
              {errors?.newPassword?.type === 'pattern' && '비밀번호를 올바르게 입력해주세요!'}
              {errors?.newPassword?.message}
            </p>
          </article>
          <article>
            <span>변경할 비밀번호 확인</span>
            <div className="flex flex-row relative">
              <input
                type={openPassword.confirmPassword ? 'text' : 'password'}
                className="input bg-background-mobile"
                autoComplete="off"
                placeholder="********"
                {...register('confirmPassword', {
                  required: true,
                })}
              />
              <OpenPassword name="confirmPassword" setOpenPassword={setOpenPassword} openPassword={openPassword} />
            </div>
            <p className="text-xs text-[#FF0000]">
              {errors?.confirmPassword?.type === 'required' && '비밀번호를 재입력해주세요!'}
              {errors?.confirmPassword?.message}
            </p>
          </article>
          <article className="w-full flex justify-center p-5">
            <button type="submit" className="red-btn p-3 text-sm font-bold">
              비밀번호 변경하기
            </button>
          </article>
        </form>
        {isModalOpen && (
          <SuccessModal
            modalName="비밀번호 변경 완료"
            routeName="/my"
            detail="입력하신 비밀번호로 변경되었습니다."
            handleClose={() => setModalOpen(false)}
          />
        )}
      </section>
    </main>
  );
};
