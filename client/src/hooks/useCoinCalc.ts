// 입력된 값과 버튼으로 들어오는 값 계산하여 1000원 단위로 계산
export const useBtnCoinCalc = (coinValue: string | number, coin: number): string => {
  const remainCoin = (+coinValue + +coin) % 1000;
  const calcCoin = +coinValue + +coin - remainCoin;
  return String(calcCoin);
};

// 입력된 값 1000원 단위로 계산
export const useCoinCalc = (coinValue: string | number): number => {
  const remainCoin = +coinValue % 1000;
  const calcCoin = +coinValue - remainCoin;
  return calcCoin;
};
