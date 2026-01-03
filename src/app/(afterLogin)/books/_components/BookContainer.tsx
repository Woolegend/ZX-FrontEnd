import { userData } from '@/mocks/user';

import Book from './Book';
import { BookListResponse, BookSearchResponse } from '@/types/aladin.type';

interface Props {
  books?: BookListResponse;
}

export default function BookContainer({ books }: Props) {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
      {books?.item.map((book) => (
        <Book key={book.isbn} book={book} />
      ))}
    </div>
  );
}
