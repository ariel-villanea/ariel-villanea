import React from 'react';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';

/**
 * Custom BlogPostItem Header Info component that hides dates
 * This component wraps the blog post header info and excludes date display
 */
export default function BlogPostItemHeaderInfo({
  className,
}: {
  className?: string;
}): React.JSX.Element | null {
  const {metadata, isBlogPostPage} = useBlogPost();
  const {tags, readingTime} = metadata;

  const showReadingTime = readingTime && !isBlogPostPage;

  // Only show reading time if available, no dates
  if (!showReadingTime && tags.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      {showReadingTime && (
        <>
          {Math.ceil(readingTime)} min read
        </>
      )}
    </div>
  );
}
