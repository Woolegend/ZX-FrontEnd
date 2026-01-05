import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';
import { getCollection } from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  console.log('✈️ ROUTE: GET library');

  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const collection = await getCollection('librarys');
    const result = await collection.find({ userId }).limit(12).toArray();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: '서버 에러가 발생했습니다.' },
      { status: 500 },
    );
  }
}
