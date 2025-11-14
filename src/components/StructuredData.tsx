import React from 'react';
import Head from '@docusaurus/Head';

interface StructuredDataProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Component for adding JSON-LD structured data to pages
 * Accepts a single schema object or an array of schema objects
 */
export default function StructuredData({ data }: StructuredDataProps): JSX.Element {
  const schemas = Array.isArray(data) ? data : [data];

  return (
    <Head>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </Head>
  );
}
