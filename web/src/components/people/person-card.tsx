'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { User, BookOpen } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Person } from '@/types';
import { cn } from '@/lib/utils';

interface PersonCardProps {
  person: Person;
  index?: number;
}

export function PersonCard({ person, index = 0 }: PersonCardProps) {
  const bookCount = person.recommended_books.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link href={`/people/${person.slug}`}>
        <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
          <CardHeader className="pb-3">
            <div className="flex items-start gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
                  {person.name}
                </h3>
                {person.role && (
                  <p className="text-sm text-muted-foreground">{person.role}</p>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className="pb-3">
            {person.bio && (
              <p className="text-sm text-muted-foreground line-clamp-2">{person.bio}</p>
            )}
          </CardContent>

          <CardFooter className="pt-3 border-t">
            <div className="flex items-center justify-between w-full text-sm">
              <div className="flex items-center space-x-1 text-muted-foreground">
                <BookOpen className="h-4 w-4" />
                <span>{bookCount} book{bookCount !== 1 ? 's' : ''}</span>
              </div>
              <User className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}
