import clientPromise from '@/lib/mongodb';

export async function POST(request: Request) {
  //TODO - 유저 검증 로직
  const res = await request.json();
  const { isbn, content } = res;

  const client = await clientPromise;
  const db = client.db('zx_test');

  const createdAt = new Date().toISOString();

  const result = db.collection('record').insertOne({
    isbn,
    content,
    createdAt,
  });
  console.log(result);
  //TODO - 응답 구체화
  return new Response(JSON.stringify(result));
}
