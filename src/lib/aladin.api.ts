import { BookLookUpResponse } from '@/types/aladin.type';

const key = process.env.ALADIN_API_TTBKEY;

const fetchBookDetailProxy = async (
  isbn: string,
): Promise<BookLookUpResponse | undefined> => {
  try {
    const res = await fetch(
      `/api/open/book/aladin/detail?query=${encodeURIComponent(isbn)}`,
    );

    if (!res.ok) throw new Error('검색 실패');

    const data = await res.json();

    return data.item;
  } catch (error) {
    console.error(error);
  }
};

//NOTE - Use Only Server Components
const fetchBookDetail = async (
  isbn: string,
): Promise<BookLookUpResponse | undefined> => {
  if (!key) throw new Error('ttfkey is not defined');

  const baseUrl = 'http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx';
  const apiParams = new URLSearchParams({
    ttbkey: key,
    ItemId: isbn,
    ItemIdType: 'ISBN13',
    Output: 'JS',
    Version: '20131101',
    Cover: 'Big',
  });

  try {
    const response = await fetch(`${baseUrl}?${apiParams.toString()}`);

    if (!response.ok) {
      throw new Error(`알라딘 API 오류: ${response.status}`);
    }

    const textData = await response.text();
    const cleanData = textData.trim().replace(/;$/, '');

    const data = JSON.parse(cleanData);

    return data.item;
  } catch (error) {
    console.error('알라딘 에러:', error);
  }
};

export { fetchBookDetailProxy, fetchBookDetail };
