import TextEditor from '@/components/TextEditor';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// 서버 컴포넌트이므로 async/await 사용 가능
export default async function BookReportPage({
  params,
}: {
  params: Promise<{ isbn: string }>;
}) {
  const { isbn } = await params; // Next.js 15 방식

  // 1. 서버에서 직접 데이터 가져오기 (API 호출 or DB 직접 연결)
  // (같은 서버 내라면 fetch보다는 DB 직접 호출을 권장하지만, 일단 fetch 예시 유지)
  let data = null;
  try {
    // 주의: 서버 컴포넌트에서 내부 API 호출 시 전체 URL 필요 (http://localhost:3000...)
    // 혹은 DB 호출 함수를 직접 import해서 쓰세요 (추천).
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/books/report?query=${isbn}`,
      {
        cache: 'no-store',
      },
    );
    if (res.ok) {
      data = await res.json();
      console.log(data);
    }
  } catch (error) {
    console.error(error);
  }

  if (!data) return <div>데이터를 찾을 수 없습니다.</div>;

  //TOTO - 임시 저장 기능 구현
  return (
    <div className="h-dvh w-full p-6">
      <Button variant="ghost" asChild>
        <Link href={`/books/${isbn}`} className="flex items-center gap-2">
          <ArrowLeft size={16} />
          <span>나가기</span>
        </Link>
      </Button>
      <TextEditor content={data[data.length - 1]?.content || ''} />
    </div>
  );
}
