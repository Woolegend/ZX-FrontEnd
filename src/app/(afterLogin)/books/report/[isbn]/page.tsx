'use client';

import { Content } from '@tiptap/react';
import { ArrowLeft, NotepadText, Save } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';

import Toolbar from '@/app/(afterLogin)/books/report/[isbn]/_components/TextEditorToolbar';
import PageContainer from '@/components/PageContainer';
import { Button } from '@/components/ui/button';
import {
  getBookReport,
  postBookReport,
  updateBookReport,
} from '@/services/report.api';

import TextEditorContent from './_components/TextEditorContent';
import useTextEditor from './_components/useTextEditor';
import { useQuery } from '@tanstack/react-query';

type DateType = {
  _id: string;
  userId: string;
  isbn: string;
  title: string;
  content: Content;
  createdAt: string;
  updatedAt: string;
};

export default function BookReportPage() {
  const { isbn } = useParams() as { isbn?: string };
  const [title, setTitle] = useState('');
  const { data, isLoading } = useQuery<DateType>({
    queryKey: ['report', isbn],
    queryFn: async () =>
      getBookReport({ isbn } as { isbn: string }).then((res) => {
        setTitle(res.title);
        return res;
      }),
    enabled: !!isbn,
  });
  const { editor } = useTextEditor({ content: data?.content || null });

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    /**
     * TODO - 제목 유효성 검사
     * 1. 길이 제한
     * 2. 특수문자 필터링
     */
    setTitle(e.target.value);
  };

  const saveReport = async () => {
    if (!editor || !isbn) return;
    if (title.trim() === '') {
      alert('제목을 입력해주세요.');
      return;
    }
    if (confirm('저장하시겠습니까?') === false) return;

    const content = editor.getJSON();

    try {
      if (data) {
        const body = { _id: data._id, title, content };
        await updateBookReport(body);
      } else {
        const body = { isbn, title, content };
        await postBookReport(body);
      }

      //TODO - 토스트 알림으로 변경
      alert('저장이 완료되었습니다.');
    } catch (error) {
      //TODO - 에러타입 구체화 및 toast
      alert('저장 중 오류가 발생했습니다.');
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <PageContainer className="flex h-dvh items-center justify-center">
        <span>Loading...</span>
      </PageContainer>
    );
  }

  //TODO - 임시 저장 기능 구현
  return (
    <PageContainer
      as="main"
      className="h-fit min-h-dvh w-dvw overflow-scroll bg-zinc-900"
      areaVisible={false}
    >
      {editor && (
        <>
          <Toolbar editor={editor} />
          <TextEditorContent
            title={title}
            onChangeTitle={onChangeTitle}
            editor={editor}
          />
        </>
      )}
      <div className="fixed right-0 bottom-0 left-0 z-10 flex items-center justify-between border-t bg-zinc-950 p-2">
        <Button
          variant="ghost"
          className="flex items-center justify-center gap-1"
          asChild
        >
          <Link href={`/books/${isbn}`}>
            <ArrowLeft />
            <span>돌아가기</span>
          </Link>
        </Button>
        <div className="flex items-center gap-4">
          <Button
            onClick={() => alert('메모보기 기능은 곧 업데이트됩니다!')}
            className="flex items-center justify-center gap-1"
          >
            <NotepadText />
            <span>메모보기</span>
          </Button>
          <Button
            variant="highlight"
            onClick={saveReport}
            className="flex items-center justify-center gap-1"
          >
            <Save />
            <span>저장하기</span>
          </Button>
        </div>
      </div>
    </PageContainer>
  );
}
