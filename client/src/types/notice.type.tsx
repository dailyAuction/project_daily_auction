export interface NotificationResp {
  noticeId: number;
  boardId: number;
  boardTitle: string;
  thumbnail: string;
  statusId: number;
  contact: string;
  coin?: number; // 상회 입찰시에만 응답
}
