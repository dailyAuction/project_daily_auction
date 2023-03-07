import { httpClient } from '../utils/httpClient';

type CoinChargeFactor = {
  coin: number;
};

export const coinAPI = {
  url: '/members/coin',
  patchCoinCharge: async ({ coin }: CoinChargeFactor) => {
    const res = await httpClient.patch(coinAPI.url, { coin });
    return res.data.coin;
  },
};
