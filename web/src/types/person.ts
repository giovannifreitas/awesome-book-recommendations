export interface Person {
  name: string;
  slug: string;
  recommended_books: string[];
  bio?: string;
  role?: string;
}

import { Book } from './book';

export interface PersonWithStats extends Person {
  book_count: number;
  books?: Book[];
}

export interface PersonFilter {
  search?: string;
  min_books?: number;
}
