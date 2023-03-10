export const RegisterProductInfo = ({ productInfo, setProductInfo }) => {
  const handlerOnchange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target.type === 'text') setProductInfo({ ...productInfo, title: e.target.value });
    if (e.target.type === 'number') setProductInfo({ ...productInfo, startingPrice: e.target.value });
    if (e.target.type === 'textarea') setProductInfo({ ...productInfo, description: e.target.value });
  };

  return (
    <div className="w-full h-3/5">
      <div className="flex justify-between items-center h-1/5 p-2.5 border-b-2">
        <label className="flex-2 w-20">제목</label>
        <input
          type="text"
          placeholder="제목"
          className="flex-1 outline-none bg-background-mobile "
          onChange={handlerOnchange}
        />
      </div>
      <div className="flex justify-between items-center h-1/5 p-2.5 border-b-2">
        <label className="flex-2 w-20">가격</label>
        <input
          type="number"
          placeholder="가격(원)"
          className="flex-1 outline-none bg-background-mobile "
          onChange={handlerOnchange}
        />
      </div>
      <div className="justify-between p-2.5 h-3/5">
        <textarea
          placeholder="제품에 대해 설명해주세요"
          className="w-full h-full outline-none bg-background-mobile resize-none"
          onChange={handlerOnchange}
        />
      </div>
    </div>
  );
};
