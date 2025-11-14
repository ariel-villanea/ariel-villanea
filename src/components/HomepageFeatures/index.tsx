import type {ReactNode} from 'react';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import latestBlogPost from '@site/.data/latestBlogPost.json';

export default function HomepageFeatures(): ReactNode {
  const {title, permalink, description, date} = latestBlogPost;
  const displayDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <section className={styles.features}>
      <div className="container">
        {/* Current Work Status */}
        <div className={styles.statusSection}>
          <Heading as="h2">Current Work Status</Heading>
          <div className={styles.statusAlert}>
            <div className={styles.statusIcon}>✓</div>
            <div className={styles.statusContent}>
              <strong>Available for Work</strong>
              <p>I'm currently on the job market and ready to start immediately. Looking for opportunities where I can contribute my 17+ years of experience in solutions architecture, full-stack development, and team leadership to solve complex challenges.</p>
              <p>If you'd like to get in touch, please feel free to reach out via my <a href="https://www.linkedin.com/in/ariel-villanea/">LinkedIn</a> or <a href="mailto:sw@villanea.com">email</a>.</p>
            </div>
          </div>
        </div>

        {/* Latest Blog Post */}
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
