import { httpClient } from '../utils/httpClient';
import { NotificationResp } from '../types/notice.type';

type NoticesResp = {
  items: NotificationResp[];
};

export const noticesAPI = {
  url: `/notices`,

  async get() {
    const res = await httpClient.get<NoticesResp>(this.url);
    return res.data.items;
  },

  async delete(id: number) {
    const res = await httpClient.delete(`${this.url}/${id}`);

    return res.data;
  },
};
