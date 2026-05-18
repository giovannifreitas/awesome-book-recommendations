'use client';

import { useState, useMemo } from 'react';
import { PersonCard } from '@/components/people/person-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import { Person } from '@/types';

interface PeopleListProps {
  people: Person[];
}

export function PeopleList({ people }: PeopleListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPeople = useMemo(() => {
    return people.filter((person) => {
      const query = searchQuery.toLowerCase();
      return person.name.toLowerCase().includes(query) ||
        (person.role && person.role.toLowerCase().includes(query)) ||
        (person.bio && person.bio.toLowerCase().includes(query));
    });
  }, [people, searchQuery]);

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="container py-8 md:py-12 max-w-7xl mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-4">All People</h1>
        <p className="text-muted-foreground text-lg">
          Discover book recommendations from {people.length} influential people
        </p>
      </div>

      {/* Search */}
      <div className="mb-8">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="search"
            placeholder="Search people by name, role, or bio..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Results count */}
      {searchQuery && (
        <div className="mb-4 text-sm text-muted-foreground">
          Showing {filteredPeople.length} of {people.length} people
        </div>
      )}

      {/* People Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPeople.map((person, index) => (
          <PersonCard key={person.slug} person={person} index={index} />
        ))}
      </div>

      {filteredPeople.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No people found matching your search</p>
          <Button variant="outline" onClick={clearSearch}>
            Clear search
          </Button>
        </div>
      )}
    </div>
  );
}
