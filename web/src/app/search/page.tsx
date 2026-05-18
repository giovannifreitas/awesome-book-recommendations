import { getBooks, getPeople, getTags } from '@/lib/data';
import { SearchList } from '@/components/search/search-list';

export default function SearchPage() {
  const books = getBooks();
  const people = getPeople();
  const tags = getTags();

  return <SearchList books={books} people={people} tags={tags} />;
}
