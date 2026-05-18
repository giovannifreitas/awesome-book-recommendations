export interface Tag {
  name: string;
  slug: string;
  book_count: number;
  books?: string[];
}

export interface TagStats {
  total_tags: number;
  tag_distribution: Record<string, number>;
  most_popular_tags: Tag[];
}
