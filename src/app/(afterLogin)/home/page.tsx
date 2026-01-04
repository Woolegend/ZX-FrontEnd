import BookMark from '@/components/BookMark';
import PageContainer from '@/components/PageContainer';
import SearchField from '@/components/SearchField';

import ProfileCard from './_components/ProfileCard';

export default function HomePage() {
  return (
    <PageContainer as="main">
      <div className="flex justify-center pb-5">
        <SearchField placeholder="책 제목, 저자, 장르를 입력해주세요..." />
      </div>
      <div className="flex gap-4">
        <div className="flex grow flex-col">
          <ProfileCard />
        </div>
        <div className="flex flex-col">
          <BookMark />
        </div>
      </div>
    </PageContainer>
  );
}
