'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { BookCard } from '@/components/books/book-card';
import { PersonCard } from '@/components/people/person-card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, X, BookOpen, Users, Tag } from 'lucide-react';
import { Book, Person, Tag as TagType } from '@/types';

interface SearchListProps {
  books: Book[];
  people: Person[];
  tags: TagType[];
}

export function SearchList({ books, people, tags }: SearchListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBooks = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return books.filter((book) =>
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }, [books, searchQuery]);

  const filteredPeople = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return people.filter((person) =>
      person.name.toLowerCase().includes(query) ||
      (person.role && person.role.toLowerCase().includes(query))
    );
  }, [people, searchQuery]);

  const filteredTags = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return tags.filter((tag) =>
      tag.name.toLowerCase().includes(query)
    );
  }, [tags, searchQuery]);

  const clearSearch = () => {
    setSearchQuery('');
  };

  const hasResults = filteredBooks.length > 0 || filteredPeople.length > 0 || filteredTags.length > 0;

  return (
    <div className="container py-8 md:py-12 max-w-7xl mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-4 text-center">Search</h1>
        <p className="text-muted-foreground text-lg text-center">
          Search across books, people, and tags
        </p>
      </div>

      {/* Search Input */}
      <div className="mb-8 max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            type="search"
            placeholder="Search for books, people, or tags..."
            className="pl-10 h-12"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Search Results */}
      {searchQuery && (
        <div className="mb-8">
          {!hasResults ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No results found for "{searchQuery}"</p>
            </div>
          ) : (
            <>
              {filteredBooks.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <BookOpen className="h-6 w-6" />
                    Books ({filteredBooks.length})
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredBooks.map((book, index) => (
                      <BookCard key={book.slug} book={book} index={index} />
                    ))}
                  </div>
                </div>
              )}

              {filteredPeople.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Users className="h-6 w-6" />
                    People ({filteredPeople.length})
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPeople.map((person, index) => (
                      <PersonCard key={person.slug} person={person} index={index} />
                    ))}
                  </div>
                </div>
              )}

              {filteredTags.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Tag className="h-6 w-6" />
                    Tags ({filteredTags.length})
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {filteredTags.map((tag) => (
                      <Link key={tag.slug} href={`/books?tag=${tag.slug}`}>
                        <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                          {tag.name} ({tag.book_count})
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Popular Tags (shown when no search) */}
      {!searchQuery && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Popular Tags</h2>
          <p className="text-muted-foreground mb-6">
            Browse books by popular categories
          </p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link key={tag.slug} href={`/books?tag=${tag.slug}`}>
                <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                  {tag.name} ({tag.book_count})
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
