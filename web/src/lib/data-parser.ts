import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Book, Person } from '@/types';

export function parseBookFile(filePath: string): Book | null {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    // Extract description and key takeaways from content
    const descriptionMatch = content.match(/## Description\n\n([\s\S]*?)(?=\n##|$)/);
    const keyTakeawaysMatch = content.match(/## Key Takeaways\n\n([\s\S]*?)(?=$)/);

    const keyTakeaways = keyTakeawaysMatch
      ? keyTakeawaysMatch[1]
          .split('\n')
          .map((line: string) => line.replace(/^-\s*/, '').trim())
          .filter(Boolean)
      : [];

    return {
      title: data.title || '',
      author: data.author || '',
      year: data.year,
      tags: data.tags || [],
      recommended_by: data.recommended_by || [],
      slug: path.basename(filePath, '.md'),
      description: descriptionMatch?.[1]?.trim(),
      key_takeaways: keyTakeaways,
    };
  } catch (error) {
    console.error(`Error parsing book file ${filePath}:`, error);
    return null;
  }
}

export function parsePersonFile(filePath: string): Person | null {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    // Extract book recommendations from [[book-slug]] format
    const recommendedBooks: string[] = [];
    const bookLinkRegex = /\[\[([^\]]+)\]\]/g;
    let match;

    while ((match = bookLinkRegex.exec(content)) !== null) {
      recommendedBooks.push(match[1]);
    }

    // Extract bio/description
    const bioMatch = content.match(/^# [^\n]+\n\n([\s\S]*?)(?=\n##|$)/);

    return {
      name: data.title || path.basename(filePath, '.md').replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      slug: path.basename(filePath, '.md'),
      recommended_books: recommendedBooks,
      bio: bioMatch?.[1]?.trim(),
      role: data.role,
    };
  } catch (error) {
    console.error(`Error parsing person file ${filePath}:`, error);
    return null;
  }
}

export function getAllBooks(booksDir: string): Book[] {
  const books: Book[] = [];

  if (!fs.existsSync(booksDir)) {
    return books;
  }

  const files = fs.readdirSync(booksDir);
  for (const file of files) {
    if (file.endsWith('.md') && file !== 'index.md') {
      const book = parseBookFile(path.join(booksDir, file));
      if (book) {
        books.push(book);
      }
    }
  }

  return books;
}

export function getAllPeople(peopleDir: string): Person[] {
  const people: Person[] = [];

  if (!fs.existsSync(peopleDir)) {
    return people;
  }

  const files = fs.readdirSync(peopleDir);
  for (const file of files) {
    if (file.endsWith('.md') && file !== 'index.md') {
      const person = parsePersonFile(path.join(peopleDir, file));
      if (person) {
        people.push(person);
      }
    }
  }

  return people;
}
