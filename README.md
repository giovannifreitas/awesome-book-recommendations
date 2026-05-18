# Awesome Book Recommendations

A curated collection of book recommendations from influencers, CEOs, and public figures, built with Next.js, React, TypeScript, and Tailwind CSS.

## Overview

This project serves as a modern web application for book recommendations, allowing you to:

- Track which books are recommended by which people
- Identify the most recommended books
- Browse books by category/tags
- Explore relationships between recommenders and books
- Search books and people with advanced filtering

## Features

- **Modern UI/UX**: Clean, responsive design with dark mode support
- **No Duplicate Books**: Each book exists only once in the system
- **Automatic Rankings**: System calculates recommendation counts automatically
- **Category Organization**: Books organized by tags and categories
- **Search & Filter**: Advanced search functionality with tag filtering
- **Breadcrumbs**: Easy navigation with breadcrumb trails
- **TypeScript**: Strong typing throughout the codebase
- **Static Export**: Fast, SEO-friendly site via Next.js static export
- **Automatic Deployment**: GitHub Actions for CI/CD to GitHub Pages

## Technologies

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Font**: Plus Jakarta Sans

## Project Structure

```
awesome-book-recommendations/
├── web/
│   ├── src/
│   │   ├── app/              # Next.js app router pages
│   │   │   ├── books/        # Book pages
│   │   │   ├── people/       # Person pages
│   │   │   ├── search/       # Search page
│   │   │   ├── generated/     # Generated pages (by-category)
│   │   │   ├── about/        # About page
│   │   │   └── layout.tsx    # Root layout
│   │   ├── components/       # React components
│   │   │   ├── books/        # Book components
│   │   │   ├── people/       # Person components
│   │   │   ├── search/       # Search components
│   │   │   ├── shared/       # Shared components
│   │   │   ├── layout/       # Layout components (header, footer)
│   │   │   └── ui/           # shadcn/ui components
│   │   ├── lib/              # Utility functions
│   │   │   ├── data.ts       # Data fetching functions
│   │   │   ├── data-parser.ts # Markdown parser
│   │   │   ├── analytics.ts  # Statistics calculations
│   │   │   └── utils.ts      # Utility functions
│   │   ├── data/             # Markdown data files
│   │   │   ├── books/        # Book markdown files
│   │   │   └── people/       # Person markdown files
│   │   └── types.ts          # TypeScript type definitions
│   ├── public/               # Static assets
│   ├── package.json          # Node dependencies
│   └── next.config.mjs       # Next.js configuration
├── .github/
│   └── workflows/
│       └── deploy-nextjs.yml # GitHub Actions workflow
├── .gitignore                # Git ignore rules
└── README.md                 # This file
```

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/giovannifreitas/awesome-book-recommendations.git
cd awesome-book-recommendations/web
```

2. Install dependencies:
```bash
npm install
```

### Local Development

To run the development server:

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

### Building the Site

To build the static site for production:

```bash
npm run build
```

The output will be in the `web/out/` directory.

### Running Production Build

To preview the production build locally:

```bash
npm run start
```

## Adding Books

To add a new book, create a markdown file in `web/src/data/books/` with YAML frontmatter:

```markdown
---
title: Book Title
author: Author Name
year: 2024
recommended_by:
  - person-slug-1
  - person-slug-2
tags:
  - category1
  - category2
description: Brief description of the book
key_takeaways:
  - Key takeaway 1
  - Key takeaway 2
---

# Book Title

Description of the book...
```

**Important**: The filename should use kebab-case (e.g., `book-title.md`).

### Adding People

To add a new person, create a markdown file in `web/src/data/people/`:

```markdown
---
name: Person Name
role: CEO, Investor, etc
bio: Brief description of the person
recommended_books:
  - book-slug-1
  - book-slug-2
---

# Person Name

Brief description of the person.
```

**Important**: The filename should use kebab-case (e.g., `person-name.md`).

## Deployment

The project uses GitHub Actions for automatic deployment to GitHub Pages.

### Setup

1. Enable GitHub Pages in your repository settings:
   - Go to Settings → Pages
   - Source: GitHub Actions

2. Update the repository information in the workflow file if needed:
   - `.github/workflows/deploy-nextjs.yml`

3. Push to the main branch to trigger automatic deployment.

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally with `npm run dev`
5. Ensure the build passes with `npm run build`
6. Submit a pull request

### Development Guidelines

- Follow the existing code style and conventions
- Use TypeScript for type safety
- Write clean, readable code with comments where necessary
- Test your changes thoroughly
- Ensure responsive design works on all screen sizes

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Inspired by the concept of knowledge management systems
