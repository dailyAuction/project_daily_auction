import { httpClient } from '../utils/httpClient';

type CoinChargeFactor = {
  coin: number;
  token?: string;
};

export const coinAPI = {
  url: '/members/coin',
  patchCoinCharge: async ({ coin, token }: CoinChargeFactor) => {
    // console.log(accessToken);
    const res = await httpClient.patch(
      coinAPI.url,
      { coin },
      {
        headers: { Authorization: token },
      }
    );
    return res.data.coin;
  },
};
