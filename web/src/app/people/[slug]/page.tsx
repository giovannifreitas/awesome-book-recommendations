import { getPersonBySlug, getBooks, getPeople } from '@/lib/data';
import { getRecommendedBooksForPerson, getTopRecommenders } from '@/lib/analytics';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { BookCard } from '@/components/books/book-card';
import { Breadcrumb } from '@/components/shared/breadcrumb';

interface PersonPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  const people = getPeople();
  return people.map((person) => ({
    slug: person.slug,
  }));
}

export default async function PersonPage({ params }: PersonPageProps) {
  const { slug } = await params;
  const person = getPersonBySlug(slug);
  
  if (!person) {
    notFound();
  }

  const allBooks = getBooks();
  const recommendedBooks = getRecommendedBooksForPerson(person.slug, allBooks);
  const allPeople = getPeople();
  const topRecommenders = getTopRecommenders(allPeople, 5);
  const isTopRecommender = topRecommenders.some((p) => p.slug === person.slug);

  return (
    <div className="container py-8 md:py-12 max-w-7xl mx-auto px-4">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'People', href: '/people' },
          { label: person.name }
        ]}
      />

      {/* Person Header */}
      <div className="mb-8">
        <div className="flex items-start gap-4 mb-4">
          <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <User className="h-10 w-10 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">{person.name}</h1>
            {person.role && (
              <p className="text-xl text-muted-foreground">{person.role}</p>
            )}
          </div>
        </div>

        {isTopRecommender && (
          <Badge className="mb-4" variant="default">
            Top Recommender
          </Badge>
        )}

        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-muted-foreground" />
            <span className="font-semibold">{person.recommended_books.length} book{person.recommended_books.length !== 1 ? 's' : ''} recommended</span>
          </div>
        </div>
      </div>

      {/* Bio */}
      {person.bio && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{person.bio}</p>
          </CardContent>
        </Card>
      )}

      {/* Recommended Books */}
      {recommendedBooks.length > 0 ? (
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            Books Recommended by {person.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedBooks.map((book, index) => (
              <BookCard key={book.slug} book={book} index={index} />
            ))}
          </div>
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No books recommended yet</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
