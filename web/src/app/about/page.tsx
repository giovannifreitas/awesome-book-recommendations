import { getBooks, getPeople, getStatistics } from '@/lib/data';
import { StatsCard } from '@/components/dashboard/stats-card';
import { BookOpen, Users, TrendingUp, Tag, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AboutPage() {
  const stats = getStatistics();
  const books = getBooks();
  const people = getPeople();

  return (
    <div className="container py-8 md:py-12 max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">About</h1>
        <p className="text-xl text-muted-foreground">
          Learn more about this project and its mission
        </p>
      </div>

      {/* Mission */}
      <section className="mb-12">
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Awesome Book Recommendations is a curated collection of book recommendations from influencers, CEOs, and public figures. Our goal is to help you discover what the world's most successful people are reading and provide insights into the books that have shaped their thinking.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Whether you're looking for productivity tips, business insights, or personal development books, you'll find recommendations from thought leaders across various industries.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Project Statistics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl">
          <StatsCard
            title="Total Books"
            value={stats.total_books}
            icon={<BookOpen className="h-4 w-4 text-muted-foreground" />}
            index={0}
          />
          <StatsCard
            title="Total People"
            value={stats.total_people}
            icon={<Users className="h-4 w-4 text-muted-foreground" />}
            index={1}
          />
          <StatsCard
            title="Recommendations"
            value={stats.total_recommendations}
            icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
            index={2}
          />
          <StatsCard
            title="Unique Tags"
            value={stats.unique_tags}
            icon={<Tag className="h-4 w-4 text-muted-foreground" />}
            index={3}
          />
        </div>
      </section>

      {/* Contribute */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Contribute</h2>
        <p className="text-muted-foreground mb-6">
          This project is open source and welcomes contributions. If you'd like to add a book recommendation, fix a bug, or improve the site, please check out our GitHub repository.
        </p>
        <Link href="https://github.com/giovannifreitas/awesome-book-recommendations" target="_blank" rel="noopener noreferrer">
          <Button size="lg">
            <ExternalLink className="mr-2 h-4 w-4" />
            View on GitHub
          </Button>
        </Link>
      </section>

      {/* Technology */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Built With</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-muted-foreground">
          <div>
            <p className="font-semibold text-foreground mb-2">Frontend</p>
            <ul className="space-y-1">
              <li>Next.js 15+</li>
              <li>React</li>
              <li>TypeScript</li>
              <li>Tailwind CSS</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-foreground mb-2">UI Components</p>
            <ul className="space-y-1">
              <li>shadcn/ui</li>
              <li>Lucide Icons</li>
              <li>Framer Motion</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
