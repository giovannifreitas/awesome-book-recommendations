'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { BookCard } from '@/components/books/book-card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import { Book, Tag } from '@/types';

interface BooksListProps {
  books: Book[];
  tags: Tag[];
}

export function BooksList({ books, tags }: BooksListProps) {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    const tagParam = searchParams.get('tag');
    if (tagParam) {
      const tag = tags.find(t => t.slug === tagParam);
      setSelectedTag(tag ? tag.name : null);
    } else {
      setSelectedTag(null);
    }
  }, [searchParams, tags]);

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch = searchQuery === '' ||
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTag = !selectedTag || book.tags.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [books, searchQuery, selectedTag]);

  const selectTag = (tagName: string) => {
    setSelectedTag(tagName);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTag(null);
  };

  const hasActiveFilters = searchQuery !== '' || selectedTag !== null;

  return (
    <div className="container py-8 md:py-12 max-w-7xl mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-4">All Books</h1>
        <p className="text-muted-foreground text-lg">
          Browse our curated collection of {books.length} book recommendations
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="search"
            placeholder="Search books by title, author, or tags..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-muted-foreground py-1">Filter by tags:</span>
            {tags.map((tag) => (
              <Badge
                key={tag.slug}
                variant={selectedTag === tag.name ? 'default' : 'outline'}
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => selectTag(tag.name)}
              >
                {tag.name} ({tag.book_count})
              </Badge>
            ))}
          </div>
        )}

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="mr-2 h-4 w-4" />
            Clear all filters
          </Button>
        )}
      </div>

      {/* Results count */}
      <div className="mb-4 text-sm text-muted-foreground">
        Showing {filteredBooks.length} of {books.length} books
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBooks.map((book, index) => (
          <BookCard key={book.slug} book={book} index={index} />
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No books found matching your criteria</p>
          <Button variant="outline" onClick={clearFilters}>
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}
