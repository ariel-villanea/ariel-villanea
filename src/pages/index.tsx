import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import StructuredData from '@site/src/components/StructuredData';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>        
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": "https://villanea.com/#person",
      "name": "Ariel Villanea",
      "jobTitle": "Solutions Architect & Software Engineer",
      "description": "Solutions Architect, Software Engineer, and Pragmatic Problem Solver with 17+ years of experience in full-stack development, cloud architecture, and team leadership",
      "url": "https://villanea.com",
      "image": "https://villanea.com/img/ariel.jpg",
      "sameAs": [
        "https://www.linkedin.com/in/ariel-villanea/",
        "https://github.com/ariel-villanea"
      ],
      "knowsAbout": [
        "Software Architecture",
        "Full-Stack Development",
        "Cloud Computing",
        "Team Leadership",
        "React",
        "TypeScript",
        "Node.js"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://villanea.com/#website",
      "url": "https://villanea.com",
      "name": "Ariel Villanea",
      "description": "Professional Profile & Blog",
      "publisher": {
        "@id": "https://villanea.com/#person"
      },
      "inLanguage": "en-US"
    }
  ];

  return (
    <Layout description="Professional Profile & Blog">
      <Head>
        <title>Ariel Villanea: Solutions Architect & Software Engineer</title>
        {schemas.map((schema, index) => (
          <script key={index} type="application/ld+json">
            {JSON.stringify(schema)}
          </script>
        ))}
      </Head>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
