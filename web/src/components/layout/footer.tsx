import Link from 'next/link';
import { BookOpen, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-background/50 backdrop-blur">
      <div className="container py-12 md:py-16 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">Book Recommendations</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              A curated collection of book recommendations from influencers, CEOs, and public figures.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-foreground">Explore</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/books" className="text-muted-foreground hover:text-primary transition-colors">
                  All Books
                </Link>
              </li>
              <li>
                <Link href="/people" className="text-muted-foreground hover:text-primary transition-colors">
                  All People
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-muted-foreground hover:text-primary transition-colors">
                  Search
                </Link>
              </li>
              <li>
                <Link href="/generated/by-category" className="text-muted-foreground hover:text-primary transition-colors">
                  By Category
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-foreground">Community</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="https://github.com/giovannifreitas/awesome-book-recommendations"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contribute
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/giovannifreitas/awesome-book-recommendations/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Report Issue
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-sm text-muted-foreground text-center">
          <p>&copy; {new Date().getFullYear()} Awesome Book Recommendations. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
