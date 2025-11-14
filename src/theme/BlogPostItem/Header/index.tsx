import React from 'react';
import BlogPostItemHeaderTitle from '@theme/BlogPostItem/Header/Title';
import BlogPostItemHeaderInfo from '@theme/BlogPostItem/Header/Info';
import BlogPostItemHeaderAuthors from '@theme/BlogPostItem/Header/Authors';

/**
 * Custom BlogPostItem Header component that excludes date display
 * This component renders the blog post header without date metadata
 */
export default function BlogPostItemHeader({
  className,
}: {
  className?: string;
}): React.JSX.Element {
  return (
    <header className={className}>
      <BlogPostItemHeaderTitle />
      <BlogPostItemHeaderInfo />
      <BlogPostItemHeaderAuthors />
    </header>
  );
}
