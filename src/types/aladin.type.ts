/*
# Aladin OpenAI manual
https://docs.google.com/document/d/1mX-WxuoGs8Hy-QalhHcvuV17n50uGI2Sg_GHofgiePE/edit?tab=t.0#heading=h.wzyr9o7mof2u 
*/

type BookSearchResponse = {
  title: string;
  link: string;
  author: string;
  pubDate: string;
  description: string;
  isbn: string;
  isbn13: string;
  itemId: number;
  priceSales: number;
  priceStandard: number;
  mallType: string;
  stockStatus: string;
  mileage: number;
  cover: string;
  categoryId: number;
  categoryName: string;
  publisher: string;
  salesPoint: number;
  adult: boolean;
  fixedPrice: boolean;
  customerReviewRank: number;
  bestDuration?: string;
  bestRank: number;
  seriesInfo?: {
    seriesId: number;
    seriesLink: string;
    seriesName: string;
  };
  subInfo: {};
};

type BookListResponse = {
  version: string;
  logo: string;
  title: string;
  link: string;
  pubDate: string;
  totalResults: number;
  startIndex: number;
  itemsPerPage: number;
  query: string;
  searchCategoryId: number;
  searchCategoryName: string;
  item: BookSearchResponse[];
};

type BookLookUpResponse = {
  adult: boolean; //성인작품 여부
  author: string; //저자명
  categoryId: number; //카테고리 ID
  categoryName: string; //카테고리 이름
  cover: string; //책 커버
  customerReviewRank: number; //고객 별점
  description: string; //책 설명
  fixedPrice: boolean; //정가제 여부
  isbn: string; //10자리 ISBN
  isbn13: string; //13자리 ISBN
  itemId: number; //상품 ID
  link: string; //상품 링크 URL
  mallType: string; //국내도서:BOOK, 음반:MUSIC, Dvd:DVD, 외서:FOREIGN, 전자책:EBOOK, 중고상품:USED)
  mileage: number; //마일리지
  priceSales: number; //판매가
  priceStandard: number; //정가
  pubDate: string; //출간일
  publisher: string; //출판사
  salesPoint: number; //판매지수
  seriesInfo: {
    seriesId: number; //시리즈 ID
    seriesLink: string; //시리즈 조회 URL
    seriesName: string;
  };
  stockStatus: string; //재고 상태
  subInfo: {
    subTitle: string; //부제
    originalTitle: string; //원제
    itemPage: number; //쪽수
  };
  title: string; //상품명
};

export type { BookSearchResponse, BookListResponse, BookLookUpResponse };
