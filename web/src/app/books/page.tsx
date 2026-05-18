import { getBooks, getTags } from '@/lib/data';
import { BooksList } from '@/components/books/books-list';

export default function BooksPage() {
  const books = getBooks();
  const tags = getTags();

  return <BooksList books={books} tags={tags} />;
}
