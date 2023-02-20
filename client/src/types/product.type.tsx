export interface ProductDetailResp {
  boardId: string;
  image: string[];
  thumbnail: string;
  authorId: number;
  bidderId: number;
  title: string;
  description: string;
  categoryId: number;
  startingPrice: string;
  currentPrice: string;
  statusId: number;
  createdAt: string;
  finishedAt: string;
  viewCount: string;
  bidCount: string;
  history: number[];
  myPrice?: string; // 내 입찰가
}

export interface ProductDetailRealtimeResp {
  boardId: string;
  price: string;
  bidCount: string;
  history: string;
}
