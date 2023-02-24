export const CATEGORIES = ['ALL', '디지털 / 가전', '가구 / 생활', '의류 / 잡화', '취미 / 게임', '음반 / 도서', '기타'];

export const AUCTION_STATUS = ['진행중', '낙찰', '마감'];

export const NOTIFICATION_STATUS = ['낙찰', '낙찰', '유찰', '상회 입찰', '마감 임박'];

export const NOTIFICATION_STATUS_MSG = [
  '님이 낙찰되셨습니다.',
  '입찰에 성공하였습니다.',
  '해당 물품이 유찰되었습니다.',
  '해당 물품이 상회입찰 되었습니다.',
  '해당 물품의 마감이 얼마 남지 않았습니다.',
];

export const CHARGECOIN_STATUS = [50000, 30000, 10000, 5000];

export const CATEGORIE_SORT_STATUS = ['마감 임박', 'TOP 입찰', 'TOP 조회', '높은 가격', '낮은 가격'];

export const REG_EMAIL = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
export const REG_PASSWORD = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
