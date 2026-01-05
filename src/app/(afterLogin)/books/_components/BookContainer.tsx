import { BookSearchResponse } from '@/types/aladin.type';

import Book from './Book';
import { LibraryType } from '@/services/library.api';

interface Props {
  books?: BookSearchResponse[] | LibraryType;
}

export default function BookContainer({ books }: Props) {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
      {books?.map((book) => (
        <Book key={book.isbn13} book={book} />
      ))}
    </div>
  );
}
