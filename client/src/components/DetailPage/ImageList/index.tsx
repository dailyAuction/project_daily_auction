export const ImageList = ({ url }) => {
  return (
    <section className="flex h-[150px] justify-cente w-full items-center overflow-x-scroll space-x-3">
      {url.map((src: string) => (
        <img key={src} src={src} className="flex-shrink-0 w-28 h-28 rounded-md object-cover" alt="상품 상세1" />
      ))}
    </section>
  );
};
