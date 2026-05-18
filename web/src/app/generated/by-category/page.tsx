import { getBooks } from '@/lib/data';
import { getPopularTags, getBooksByTag } from '@/lib/analytics';
import { BookCard } from '@/components/books/book-card';
import { BookOpen, Tag } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export default function ByCategoryPage() {
  const books = getBooks();
  const popularTags = getPopularTags(books, 20);

  return (
    <div className="container py-8 md:py-12 max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <Tag className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold tracking-tight">Books by Category</h1>
        </div>
        <p className="text-xl text-muted-foreground">
          Browse books organized by their tags and categories
        </p>
      </div>

      {/* Categories */}
      <div className="space-y-12">
        {popularTags.map((tag, index) => {
          const booksInTag = getBooksByTag(books, tag.name);
          return (
            <section key={tag.slug}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="text-sm px-3 py-1">
                    {tag.book_count} books
                  </Badge>
                  <h2 className="text-2xl font-bold">{tag.name}</h2>
                </div>
                <Link href={`/books?tag=${tag.slug}`}>
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                    View all
                  </Badge>
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {booksInTag.slice(0, 4).map((book) => (
                  <BookCard key={book.slug} book={book} index={index} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
