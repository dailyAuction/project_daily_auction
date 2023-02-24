import { useState } from 'react';
import { Increment, useClickCarousel } from './useClickCarousel';

type ModalProps = {
  handleClose: () => void;
  handleMove: (calc: Increment) => void;
  selectedIndex: number;
  url: string[];
};

export const ImageModal = ({ handleClose, handleMove, selectedIndex, url }: ModalProps) => {
  return (
    <section className="bg-modal">
      <div className="bg-white/[.80] mb-2 cursor-pointer" onClick={handleClose}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>

      <img src={url[selectedIndex]} alt="상품 확대 이미지" className="opacity-100 w-[340px] relative" />

      <article className="flex w-full justify-between absolute px-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-10 h-10 cursor-pointer"
          onClick={() => handleMove(-1)}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-10 h-10 cursor-pointer"
          onClick={() => handleMove(1)}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </article>
    </section>
  );
};

type ImageListProps = {
  url: string[];
};

const URL_TEMP = [
  'https://images.unsplash.com/photo-1521369909029-2afed882baee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  'https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  'https://images.unsplash.com/photo-1582791694770-cbdc9dda338f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  'https://plus.unsplash.com/premium_photo-1671658221680-6eedc3804834?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80',
  'https://images.unsplash.com/photo-1622445275576-721325763afe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  'https://images.unsplash.com/photo-1618354691792-d1d42acfd860?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80',
];

export const ImageList = ({ url }: ImageListProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const { moveCarouosel } = useClickCarousel(setSelectedIndex, selectedIndex, URL_TEMP.length);

  return (
    <>
      <section className="flex h-[150px] justify-cente w-full items-center overflow-x-scroll space-x-3">
        {URL_TEMP.map((src: string, idx: number) => (
          <img
            key={src}
            src={src}
            className="flex-shrink-0 w-28 h-28 rounded-md object-cover cursor-pointer"
            alt={` ${idx + 1} 번째 상품 상세 이미지`}
            onClick={() => {
              setSelectedIndex(idx);
              setModalOpen(true);
            }}
            role="presentation"
          />
        ))}
      </section>
      {isModalOpen && (
        <ImageModal
          handleClose={() => setModalOpen(false)}
          handleMove={moveCarouosel}
          url={url}
          selectedIndex={selectedIndex}
        />
      )}
    </>
  );
};
