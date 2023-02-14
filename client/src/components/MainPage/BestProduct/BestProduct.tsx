import { useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { ProductItem } from '../../_common/\bProductItem/ProductItem';
import { CATEGORIES } from '../../../constants/constants';
import { ProductDetailResp } from '../../../types/product.type';

export const Bestproduct = () => {
  const [categoryId, setCategoryId] = useState(0);

  const getBestProduct = async () => {
    const path = categoryId ? `${categoryId}/popular-item` : 'all-popular-item';
    const { data } = await axios.get<ProductDetailResp[]>(`${process.env.REACT_APP_URL}/${path}`);
    return data;
  };

  const {
    data: bestProduct,
    isLoading,
    isError,
  } = useQuery<ProductDetailResp[], Error>('bestProduct', getBestProduct, {
    staleTime: 1000 * 20,
    retry: 0,
    onError: (e) => console.log(e.message),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>카테고리별 인기상품이 없습니다.</div>;

  return (
    <div className="w-full">
      <div className="flex items-center">
        <h1 className="text-lg m-2 mr-1 font-bold">카테고리별 인기상품</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="red"
          className="w-6 h-6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
          />
        </svg>
      </div>
      <div className="p-2 pb-4 overflow-x-scroll scrollbar-hide">
        <section className="w-max space-x-3">
          {CATEGORIES.map((el, i) => {
            return (
              <span key={el} onClick={() => setCategoryId(i)}>
                <button type="button" className={`category-btn ${categoryId === i && 'bg-main-red text-white'}`}>
                  {el}
                </button>
              </span>
            );
          })}
        </section>
      </div>
      <div className="flex flex-col gap-2 items-center">
        {bestProduct?.map((el) => {
          return (
            <div key={el.boardId} className="w-[96%]">
              <ProductItem productDetail={el} />
            </div>
          );
        })}
      </div>
    </div>
  );
};