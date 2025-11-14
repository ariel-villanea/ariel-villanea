import type {ReactNode} from 'react';
import useGlobalData from '@docusaurus/useGlobalData';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export default function HomepageFeatures(): ReactNode {
  const globalData = useGlobalData();

  // Debug: log what's available
  console.log('Global Data:', Object.keys(globalData));
  console.log('Blog Plugin Data:', globalData['docusaurus-plugin-content-blog']);

  const blogData = globalData['docusaurus-plugin-content-blog']?.['default'];
  console.log('Blog Data:', blogData);

  if (!blogData) {
    return (
      <section className={styles.features}>
        <div className="container">
          <div className={styles.blogPost}>
            <p>Blog data not available. Check console for debugging info.</p>
          </div>
        </div>
      </section>
    );
  }

  // Try to access recent posts - checking different possible structures
  const recentPosts = (blogData as any).recentPosts || (blogData as any).blogPosts || (blogData as any).posts;
  console.log('Recent Posts:', recentPosts);

  if (!recentPosts || recentPosts.length === 0) {
    return (
      <section className={styles.features}>
        <div className="container">
          <div className={styles.blogPost}>
            <p>No blog posts found. Check console for debugging info.</p>
          </div>
        </div>
      </section>
    );
  }

  const recentPost = recentPosts[0];
  const {title, permalink, description, date} = recentPost.metadata || recentPost;
  const displayDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.blogPost}>
          <Heading as="h2">Latest from the Blog</Heading>
          <article>
            <Heading as="h3">
              <Link to={permalink}>{title}</Link>
            </Heading>
            <p className={styles.blogDate}>{displayDate}</p>
            <div className={styles.blogContent}>
              {description && <p>{description}</p>}
              <Link to={permalink} className={styles.readMore}>
                Read more →
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
