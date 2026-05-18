'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Star } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Book } from '@/types';
import { cn } from '@/lib/utils';

interface BookCardProps {
  book: Book;
  index?: number;
}

export function BookCard({ book, index = 0 }: BookCardProps) {
  const recommendationCount = book.recommended_by.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link href={`/books/${book.slug}`}>
        <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2">
                  {book.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{book.author}</p>
                {book.year && (
                  <p className="text-xs text-muted-foreground">{book.year}</p>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className="pb-3">
            {book.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">{book.description}</p>
            )}
            
            {book.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-3">
                {book.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {book.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{book.tags.length - 3}
                  </Badge>
                )}
              </div>
            )}
          </CardContent>

          <CardFooter className="pt-3 border-t">
            <div className="flex items-center justify-between w-full text-sm">
              <div className="flex items-center space-x-1 text-muted-foreground">
                <Star className={cn('h-4 w-4', recommendationCount > 0 ? 'fill-yellow-400 text-yellow-400' : '')} />
                <span>{recommendationCount} recommendation{recommendationCount !== 1 ? 's' : ''}</span>
              </div>
              <BookOpen className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}
