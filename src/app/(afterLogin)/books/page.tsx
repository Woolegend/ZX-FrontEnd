import SearchField from '@/components/SearchField';

import BookContainer from './_components/BookContainer';

export default function LibraryPage() {
  return (
    <main className="m-auto w-[920px] p-4">
      <div className="flex justify-center pb-5">
        <SearchField placeholder="책 제목, 저자, 장르를 입력해주세요..." />
      </div>
      <BookContainer />
    </main>
  );
}
