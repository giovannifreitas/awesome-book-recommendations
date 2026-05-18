import { getBooks, getTags } from '@/lib/data';
import { BooksList } from '@/components/books/books-list';
import { Suspense } from 'react';

export default function BooksPage() {
  const books = getBooks();
  const tags = getTags();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BooksList books={books} tags={tags} />
    </Suspense>
  );
}
