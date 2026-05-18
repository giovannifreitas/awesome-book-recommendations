import { getPeople } from '@/lib/data';
import { PeopleList } from '@/components/people/people-list';

export default function PeoplePage() {
  const people = getPeople();

  return <PeopleList people={people} />;
}
