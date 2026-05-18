import { Book, Person, Statistics, Tag } from '@/types';

export function calculateStatistics(books: Book[], people: Person[]): Statistics {
  const total_books = books.length;
  const total_people = people.length;
  const total_recommendations = books.reduce((sum, book) => sum + book.recommended_by.length, 0);

  const all_tags = books.flatMap((book) => book.tags);
  const unique_tags = new Set(all_tags).size;

  const avg_recommendations_per_book = total_books > 0 ? total_recommendations / total_books : 0;
  const avg_books_per_person = total_people > 0 ? total_recommendations / total_people : 0;

  // Find most recommended book
  const bookRecommendationCounts = books.map((book) => ({
    slug: book.slug,
    count: book.recommended_by.length,
  }));
  bookRecommendationCounts.sort((a, b) => b.count - a.count);
  const most_recommended_book = bookRecommendationCounts[0]?.count > 0
    ? bookRecommendationCounts[0]
    : undefined;

  // Find top recommender
  const personBookCounts = people.map((person) => ({
    slug: person.slug,
    count: person.recommended_books.length,
  }));
  personBookCounts.sort((a, b) => b.count - a.count);
  const top_recommender = personBookCounts[0]?.count > 0 ? personBookCounts[0] : undefined;

  return {
    total_books,
    total_people,
    total_recommendations,
    unique_tags,
    avg_recommendations_per_book: Math.round(avg_recommendations_per_book * 100) / 100,
    avg_books_per_person: Math.round(avg_books_per_person * 100) / 100,
    most_recommended_book,
    top_recommender,
  };
}

export function getTagDistribution(books: Book[]): Record<string, number> {
  const distribution: Record<string, number> = {};

  for (const book of books) {
    for (const tag of book.tags) {
      distribution[tag] = (distribution[tag] || 0) + 1;
    }
  }

  return distribution;
}

export function getMostRecommendedBooks(books: Book[], limit: number = 10): Book[] {
  return [...books]
    .sort((a, b) => b.recommended_by.length - a.recommended_by.length)
    .slice(0, limit);
}

export function getTopRecommenders(people: Person[], limit: number = 10): Person[] {
  return [...people]
    .sort((a, b) => b.recommended_books.length - a.recommended_books.length)
    .slice(0, limit);
}

export function getBooksByTag(books: Book[], tag: string): Book[] {
  return books.filter((book) => book.tags.includes(tag));
}

export function getBooksByAuthor(books: Book[], author: string): Book[] {
  return books.filter((book) => book.author.toLowerCase() === author.toLowerCase());
}

export function getRecommendedBooksForPerson(personSlug: string, books: Book[]): Book[] {
  return books.filter((book) => book.recommended_by.includes(personSlug));
}

export function getRecommendersForBook(bookSlug: string, people: Person[]): Person[] {
  return people.filter((person) => person.recommended_books.includes(bookSlug));
}

export function getPopularTags(books: Book[], limit: number = 20): Tag[] {
  const distribution = getTagDistribution(books);
  return Object.entries(distribution)
    .map(([name, book_count]) => ({
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      book_count,
    }))
    .sort((a, b) => b.book_count - a.book_count)
    .slice(0, limit);
}

export function getRelatedBooks(book: Book, allBooks: Book[], limit: number = 5): Book[] {
  // Find books with shared tags
  const sharedTagBooks = allBooks
    .filter((b) => b.slug !== book.slug && b.tags.some((tag) => book.tags.includes(tag)))
    .map((b) => ({
      book: b,
      sharedTags: b.tags.filter((tag) => book.tags.includes(tag)).length,
    }))
    .sort((a, b) => b.sharedTags - a.sharedTags)
    .slice(0, limit);

  return sharedTagBooks.map((item) => item.book);
}
