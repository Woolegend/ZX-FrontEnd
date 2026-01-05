'use client';

import { useQuery } from '@tanstack/react-query';

import SearchField from '@/components/SearchField';
import { getLibrary } from '@/services/library.api';

import BookContainer from './_components/BookContainer';

export default function LibraryPage() {
  const { data } = useQuery({
    queryKey: ['library'],
    queryFn: getLibrary,
  });

  return (
    <main className="m-auto w-[920px] p-4">
      <div className="flex justify-center pb-5">
        <SearchField placeholder="책 제목, 저자, 장르를 입력해주세요..." />
      </div>
      <BookContainer books={data} />
    </main>
  );
}
