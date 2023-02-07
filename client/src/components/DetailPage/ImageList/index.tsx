export const ImageList = ({ url }) => {
  return (
    <section className="flex h-[150px] justify-cente w-full items-center overflow-x-scroll space-x-3">
      {url.map((src: string, idx: number) => (
        <img
          key={src}
          src={src}
          className="flex-shrink-0 w-28 h-28 rounded-md object-cover cursor-pointer"
          alt={` ${idx + 1} 번째 상품 상세 이미지`}
        />
      ))}
    </section>
  );
};
