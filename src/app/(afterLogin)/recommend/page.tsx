import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

async function getBooksRecommended() {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/search/book/aladin`;
  const response = await fetch(url, {
    method: 'GET',
    next: {
      tags: ['books', 'recommended'],
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return await response.json();
}

export default async function RecommendPage() {
  const queryClient = new QueryClient();
  const dehydratedState = dehydrate(queryClient);
  await queryClient.prefetchQuery({
    queryKey: ['books'],
    queryFn: getBooksRecommended,
  });

  return (
    <main className="m-auto w-[920px] p-4">
      <h1>Library Page</h1>
      <HydrationBoundary state={dehydratedState}>
        {/* <Book /> */}
      </HydrationBoundary>
    </main>
  );
}
