import { useState } from 'react';
import imageCompression from 'browser-image-compression';
import heic2any from 'heic2any';

export const RegisterItemImg = ({ myImage, setMyImage }) => {
  const [viewImage, setViewImage] = useState([]);

  const handleAddImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let nowSelectImageList = e.target.files[0];
    const nowImgURLList = [...myImage];

    // image 5개까지 등록가능
    if (myImage.length > 4) return alert('이미지는 5개까지 등록 가능합니다');

    // 확장자 heic인 경우 jpeg로 변환
    const iphoneFile = ['HEIC', 'heic', 'HEIF', 'heif'];
    const nowImgFile = nowSelectImageList.name.split('.').at(-1);
    if (iphoneFile.includes(nowImgFile)) {
      await heic2any({ blob: nowSelectImageList, toType: 'image/jpeg' }).then((converted: File) => {
        nowSelectImageList = converted;
      });
    }
    const nowImageUrl = URL.createObjectURL(nowSelectImageList);
    setViewImage([...viewImage, nowImageUrl]);
    nowImgURLList.push(await imageCompression(nowSelectImageList, { maxSizeMB: 0.2 })); // 이미지 압축
    setMyImage(nowImgURLList);
  };

  const handleDelImage = (idx: number) => {
    const copyView = [...viewImage];
    const copyImg = [...myImage];
    copyView.splice(idx, 1);
    copyImg.splice(idx, 1);
    setViewImage(copyView);
    setMyImage(copyImg);
  };

  return (
    <section className="base-layout overflow-x-auto scrollbar-hide flex items-start justify-center h-1/5">
      <div className="flex px-2">
        <div onChange={handleAddImage}>
          <label htmlFor="input-file">
            <div className="w-24 h-24 bg-white border-2 border-light-gray rounded-[10px] p-1.5 mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={0.5}
                stroke="#E8E2E2"
                className="w-20 h-20 ml-0.5 cursor-pointer opacity-80 hover:opacity-100">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </div>
            <input
              type="file"
              id="input-file"
              name="imgUpload"
              multiple
              accept="image/* image/heic image/heif"
              style={{ display: 'none' }}
            />
          </label>
        </div>

        <div className="flex justify-start align-middle">
          {Array.isArray(viewImage) &&
            viewImage.map((x, i) => {
              return (
                <div
                  key={x}
                  className="flex justify-center align-middle w-24 h-24 bg-white border-2 border-light-gray rounded-[10px] mr-3 relative">
                  <img className="rounded-[10px]" src={x} alt="img" />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    stroke="currentColor"
                    className="absolute right-1 top-1.5 w-3 h-3 cursor-pointer opacity-70"
                    onClick={() => handleDelImage(i)}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};
