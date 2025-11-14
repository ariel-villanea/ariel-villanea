#!/usr/bin/env node

/**
 * This script updates the latestBlogPost.json file with the most recent blog post.
 * Run this script after adding a new blog post to update the homepage.
 *
 * Usage: node scripts/update-latest-blog.js
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const BLOG_DIR = path.join(__dirname, '..', 'blog');
const OUTPUT_FILE = path.join(__dirname, '..', '.data', 'latestBlogPost.json');

// Get all blog post files
const blogFiles = fs.readdirSync(BLOG_DIR)
  .filter(file => file.endsWith('.md') || file.endsWith('.mdx'))
  .map(file => {
    const filePath = path.join(BLOG_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const { data, content: postContent } = matter(content);

    // Extract the first paragraph (before <!--truncate-->)
    const truncateIndex = postContent.indexOf('<!--truncate-->');
    const excerpt = truncateIndex > 0
      ? postContent.substring(0, truncateIndex).trim()
      : postContent.substring(0, 300).trim();

    // Remove markdown headers and extra whitespace from excerpt
    const description = excerpt
      .replace(/^#+\s+/gm, '') // Remove headers
      .replace(/\n\n+/g, ' ')  // Replace multiple newlines with space
      .trim();

    // Extract date from filename (YYYY-MM-DD.md format)
    const dateMatch = file.match(/^(\d{4}-\d{2}-\d{2})/);
    const fileDate = dateMatch ? dateMatch[1] : null;

    return {
      filename: file,
      title: data.title,
      slug: data.slug,
      date: fileDate || data.date || new Date().toISOString().split('T')[0],
      description: description.substring(0, 250), // Limit description length
    };
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date, newest first

if (blogFiles.length === 0) {
  console.error('No blog posts found!');
  process.exit(1);
}

const latestPost = blogFiles[0];
const output = {
  title: latestPost.title,
  permalink: `/blog/${latestPost.slug}`,
  description: latestPost.description,
  date: latestPost.date
};

// Ensure .data directory exists
const outputDir = path.dirname(OUTPUT_FILE);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Write to output file
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2) + '\n');

console.log('✓ Updated latest blog post:');
console.log(`  Title: ${output.title}`);
console.log(`  Date: ${output.date}`);
console.log(`  File: ${OUTPUT_FILE}`);
