import { useState } from 'react';

export const RegisterItemImg = ({ myImage, setMyImage }) => {
  const [viewImage, setViewImage] = useState([]);

  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nowSelectImageList = e.target.files[0];
    const nowImgURLList = [...myImage];
    const nowImageUrl = URL.createObjectURL(nowSelectImageList);
    if (myImage.length > 4) alert('이미지는 5개까지 등록 가능합니다');
    else {
      nowImgURLList.push(nowSelectImageList);
      setViewImage([...viewImage, nowImageUrl]);
      setMyImage(nowImgURLList);
    }
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
            <input type="file" id="input-file" name="imgUpload" multiple accept="image/*" style={{ display: 'none' }} />
          </label>
        </div>

        <div className="flex justify-start align-middle">
          {Array.isArray(viewImage) &&
            viewImage.map((x) => {
              return (
                <div
                  key={x}
                  className="flex justify-center align-middle w-24 h-24 bg-white border-2 border-light-gray rounded-[10px] mr-3">
                  <img className="rounded-[10px]" src={x} alt="img" />
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};
