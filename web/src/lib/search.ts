import Fuse from 'fuse.js';
import { Book, Person, SearchResult, Tag } from '@/types';

const fuseOptions = {
  keys: [
    { name: 'title', weight: 0.4 },
    { name: 'author', weight: 0.3 },
    { name: 'tags', weight: 0.2 },
    { name: 'description', weight: 0.1 },
  ],
  threshold: 0.3,
  includeScore: true,
};

const personFuseOptions = {
  keys: [
    { name: 'name', weight: 0.6 },
    { name: 'bio', weight: 0.3 },
    { name: 'role', weight: 0.1 },
  ],
  threshold: 0.3,
  includeScore: true,
};

const tagFuseOptions = {
  keys: ['name'],
  threshold: 0.3,
  includeScore: true,
};

export class SearchEngine {
  private bookFuse: Fuse<Book>;
  private personFuse: Fuse<Person>;
  private tagFuse: Fuse<Tag>;

  constructor(books: Book[], people: Person[], tags: Tag[]) {
    this.bookFuse = new Fuse(books, fuseOptions);
    this.personFuse = new Fuse(people, personFuseOptions);
    this.tagFuse = new Fuse(tags, tagFuseOptions);
  }

  search(query: string): SearchResult[] {
    if (!query.trim()) {
      return [];
    }

    const results: SearchResult[] = [];

    // Search books
    const bookResults = this.bookFuse.search(query);
    for (const result of bookResults) {
      results.push({
        type: 'book',
        item: result.item,
        score: result.score || 0,
      });
    }

    // Search people
    const personResults = this.personFuse.search(query);
    for (const result of personResults) {
      results.push({
        type: 'person',
        item: result.item,
        score: result.score || 0,
      });
    }

    // Search tags
    const tagResults = this.tagFuse.search(query);
    for (const result of tagResults) {
      results.push({
        type: 'tag',
        item: result.item,
        score: result.score || 0,
      });
    }

    // Sort by score
    return results.sort((a, b) => a.score - b.score);
  }

  searchBooks(query: string): Book[] {
    if (!query.trim()) {
      return [];
    }
    return this.bookFuse.search(query).map((result) => result.item);
  }

  searchPeople(query: string): Person[] {
    if (!query.trim()) {
      return [];
    }
    return this.personFuse.search(query).map((result) => result.item);
  }

  searchTags(query: string): Tag[] {
    if (!query.trim()) {
      return [];
    }
    return this.tagFuse.search(query).map((result) => result.item);
  }
}
