import path from 'path';
import { getAllBooks, getAllPeople } from './data-parser';
import { calculateStatistics, getPopularTags, getMostRecommendedBooks } from './analytics';
import { Book, Person, Statistics, Tag } from '@/types';

// Cache for data
let booksCache: Book[] | null = null;
let peopleCache: Person[] | null = null;
let statsCache: Statistics | null = null;
let tagsCache: Tag[] | null = null;

export function getBooks(): Book[] {
  if (!booksCache) {
    const booksDir = path.join(process.cwd(), 'src', 'data', 'books');
    booksCache = getAllBooks(booksDir);
  }
  return booksCache;
}

export function getPeople(): Person[] {
  if (!peopleCache) {
    const peopleDir = path.join(process.cwd(), 'src', 'data', 'people');
    peopleCache = getAllPeople(peopleDir);
  }
  return peopleCache;
}

export function getStatistics(): Statistics {
  if (!statsCache) {
    const books = getBooks();
    const people = getPeople();
    statsCache = calculateStatistics(books, people);
  }
  return statsCache;
}

export function getTags(): Tag[] {
  if (!tagsCache) {
    const books = getBooks();
    tagsCache = getPopularTags(books);
  }
  return tagsCache;
}

export function getBookBySlug(slug: string): Book | undefined {
  const books = getBooks();
  return books.find((book) => book.slug === slug);
}

export function getPersonBySlug(slug: string): Person | undefined {
  const people = getPeople();
  return people.find((person) => person.slug === slug);
}

export function getTagBySlug(slug: string): Tag | undefined {
  const tags = getTags();
  return tags.find((tag) => tag.slug === slug);
}

export { getMostRecommendedBooks };
