import { ProductItem } from '../../_common/\bProductItem/ProductItem';

export const SearchResultList = () => {
  const isLoginUser = true;
  return (
    <section className="flex flex-col space-y-3">
      <ProductItem isLoginUser={isLoginUser} status={0} />
      <ProductItem isLoginUser={isLoginUser} status={0} />
      <ProductItem isLoginUser={isLoginUser} status={0} />
    </section>
  );
};
