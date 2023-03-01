export interface ProductDetailResp {
  boardId: string;
  imageUrls?: string[];
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
  sellerEmail?: string;
}

export interface ProductDetailRealtimeResp {
  boardId: number;
  currentPrice: number;
  bidCount: number;
  history: number[];
}
