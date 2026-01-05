import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';
import { getCollection } from '@/lib/mongodb';

type Params = {
  params: Promise<{
    isbn: string;
  }>;
};

export async function GET(request: NextRequest, { params }: Params) {
  console.log('✈️ ROUTE: GET library isbn');

  const session = await auth();
  const userId = session?.user.id;
  const { isbn: isbn13 } = await params;

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const collection = await getCollection('librarys');
    const result = await collection.findOne({ userId, isbn13 });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: '서버 에러가 발생했습니다.' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  console.log('✈️ ROUTE: POST library isbn');

  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { isbn13, title, author, cover, itemPage, readPages } = body;

  const docBody = {
    userId,
    isbn13,
    title,
    author,
    cover,
    itemPage,
    readPages,
  };

  try {
    const collection = await getCollection('librarys');

    const exists = await collection.findOne({ userId, isbn13 });

    if (exists) {
      return NextResponse.json(
        { message: '이미 서재에 있습니다.' },
        { status: 409 },
      );
    }

    const result = await collection.insertOne(docBody);
    return NextResponse.json(
      { message: '서재에 책을 추가했습니다.', id: result.insertedId },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: '서버 에러가 발생했습니다.' },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  console.log('✈️ ROUTE: DELETE library isbn');

  const session = await auth();
  const userId = session?.user.id;
  const { isbn: isbn13 } = await params;

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const collection = await getCollection('librarys');

    const result = await collection.deleteOne({ userId, isbn13 });

    return NextResponse.json(
      { message: '서재에서 책을 제거했습니다.', result },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: '서버 에러가 발생했습니다.' },
      { status: 500 },
    );
  }
}
