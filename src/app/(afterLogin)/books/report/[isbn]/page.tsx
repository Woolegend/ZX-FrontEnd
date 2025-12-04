import TextEditor from '@/components/TextEditor';

export default function BookReportPage() {
  const data = '<h2>hello world!</h2>';

  return (
    <div className="h-dvh w-full p-6">
      <TextEditor content={data} />
    </div>
  );
}
