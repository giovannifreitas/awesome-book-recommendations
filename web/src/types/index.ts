export * from './book';
export * from './person';
export * from './tag';

import { Book } from './book';
import { Person } from './person';
import { Tag } from './tag';

export interface Statistics {
  total_books: number;
  total_people: number;
  total_recommendations: number;
  unique_tags: number;
  avg_recommendations_per_book: number;
  avg_books_per_person: number;
  most_recommended_book?: { slug: string; count: number };
  top_recommender?: { slug: string; count: number };
}

export interface SearchResult {
  type: 'book' | 'person' | 'tag';
  item: Book | Person | Tag;
  score: number;
}
