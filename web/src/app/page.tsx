import Link from 'next/link';
import { BookOpen, ArrowRight } from 'lucide-react';
import { getBooks, getMostRecommendedBooks } from '@/lib/data';
import { BookCard } from '@/components/books/book-card';
import { Button } from '@/components/ui/button';

export default function Home() {
  const books = getBooks();
  const mostRecommended = getMostRecommendedBooks(books, 6);

  return (
    <div className="container py-8 md:py-12 max-w-7xl mx-auto px-4">
      {/* Hero Section */}
      <section className="mb-12 md:mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Awesome Book Recommendations
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            A curated collection of book recommendations from influencers, CEOs, and public figures.
            Discover what the world's most successful people are reading.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/books">
              <Button size="lg">
                Browse Books
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/people">
              <Button variant="outline" size="lg">
                Explore People
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Most Recommended Books */}
      <section className="mb-12 md:mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Most Recommended Books</h2>
          <Link href="/books">
            <Button variant="ghost">View All</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mostRecommended.map((book: any, index: number) => (
            <BookCard key={book.slug} book={book} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
}
