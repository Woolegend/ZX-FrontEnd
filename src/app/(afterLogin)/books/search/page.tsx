'use client';

import SearchField from '@/components/SearchField';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { fetchBookSearchProxy } from '@/lib/aladin.api';
import BookContainer from '../_components/BookContainer';

export default function LibraryPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('keyword');

  if (!query || query.length < 2) return null;

  const { data } = useQuery({
    queryKey: ['books', query],
    queryFn: async () => fetchBookSearchProxy({ query }),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  return (
    <main className="m-auto w-[920px] p-4">
      <div className="flex justify-center pb-5">
        <SearchField placeholder="책 제목, 저자, 장르를 입력해주세요..." />
      </div>
      {data && <BookContainer books={data} />}
    </main>
  );
}
