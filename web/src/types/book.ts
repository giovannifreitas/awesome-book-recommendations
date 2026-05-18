export interface Book {
  title: string;
  author: string;
  year?: number;
  tags: string[];
  recommended_by: string[];
  slug: string;
  description?: string;
  key_takeaways?: string[];
}

import { Person } from './person';

export interface BookWithStats extends Book {
  recommendation_count: number;
  recommenders?: Person[];
}

export interface BookFilter {
  tags?: string[];
  author?: string;
  year?: number;
  min_recommendations?: number;
  search?: string;
}
