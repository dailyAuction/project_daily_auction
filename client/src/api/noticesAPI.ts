import { httpClient } from '../utils/httpClient';
import { NotificationResp } from '../types/notice.type';

type NoticesResp = {
  items: NotificationResp[];
};

export const noticesAPI = {
  url: `/notices`,

  async get(token: string) {
    const option = {
      headers: {
        Authorization: token,
      },
    };

    const res = await httpClient.get<NoticesResp>(this.url, option);
    return res.data.items;
  },

  async delete(id: number, token: string) {
    const res = await httpClient.delete(`${this.url}/${id}`, {
      headers: {
        Authorization: token,
      },
    });

    return res.data;
  },
};
