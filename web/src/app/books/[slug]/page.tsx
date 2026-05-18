import { getBookBySlug, getBooks, getPeople } from '@/lib/data';
import { getRecommendersForBook, getRelatedBooks } from '@/lib/analytics';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, BookOpen, User } from 'lucide-react';
import Link from 'next/link';
import { BookCard } from '@/components/books/book-card';
import { Breadcrumb } from '@/components/shared/breadcrumb';

interface BookPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  const books = getBooks();
  return books.map((book) => ({
    slug: book.slug,
  }));
}

export default async function BookPage({ params }: BookPageProps) {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  
  if (!book) {
    notFound();
  }

  const allBooks = getBooks();
  const allPeople = getPeople();
  const recommenders = getRecommendersForBook(book.slug, allPeople);
  const relatedBooks = getRelatedBooks(book, allBooks, 4);

  return (
    <div className="container py-8 md:py-12 max-w-7xl mx-auto px-4">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Books', href: '/books' },
          { label: book.title }
        ]}
      />

      {/* Book Header */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{book.title}</h1>
        <p className="text-2xl text-muted-foreground mb-4">by {book.author}</p>
        {book.year && (
          <p className="text-muted-foreground mb-6">Published: {book.year}</p>
        )}
        
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
            <span className="font-semibold">{book.recommended_by.length} recommendation{book.recommended_by.length !== 1 ? 's' : ''}</span>
          </div>
        </div>

        {book.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {book.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Description */}
      {book.description && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>About this book</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{book.description}</p>
          </CardContent>
        </Card>
      )}

      {/* Key Takeaways */}
      {book.key_takeaways && book.key_takeaways.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Key Takeaways</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {book.key_takeaways.slice(0, 7).map((takeaway, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-muted-foreground">{takeaway}</span>
                </li>
              ))}
            </ul>
            {book.key_takeaways.length > 7 && (
              <p className="text-sm text-muted-foreground mt-4">
                +{book.key_takeaways.length - 7} more takeaways
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Recommended By */}
      {recommenders.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Recommended by {recommenders.length} person{recommenders.length !== 1 ? 's' : ''}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {recommenders.map((person) => (
                <Link key={person.slug} href={`/people/${person.slug}`}>
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                    {person.name}
                  </Badge>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Related Books */}
      {relatedBooks.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            Related Books
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedBooks.map((relatedBook, index) => (
              <BookCard key={relatedBook.slug} book={relatedBook} index={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
