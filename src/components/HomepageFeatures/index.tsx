import type {ReactNode} from 'react';
import {usePluginData} from '@docusaurus/useGlobalData';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

type BlogPost = {
  id: string;
  metadata: {
    permalink: string;
    title: string;
    date: string;
    formattedDate: string;
    description?: string;
    tags: Array<{label: string; permalink: string}>;
  };
  content: string;
};

type BlogPluginData = {
  blogPosts: BlogPost[];
  blogTitle: string;
  blogDescription: string;
  totalCount: number;
};

export default function HomepageFeatures(): ReactNode {
  const blogData = usePluginData('docusaurus-plugin-content-blog', 'default') as BlogPluginData;

  if (!blogData?.blogPosts || blogData.blogPosts.length === 0) {
    return null;
  }

  const recentPost = blogData.blogPosts[0];
  const {title, permalink, formattedDate, description} = recentPost.metadata;

  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.blogPost}>
          <Heading as="h2">Latest from the Blog</Heading>
          <article>
            <Heading as="h3">
              <Link to={permalink}>{title}</Link>
            </Heading>
            <p className={styles.blogDate}>{formattedDate}</p>
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
