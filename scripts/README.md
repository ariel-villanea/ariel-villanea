# Scripts

This directory contains utility scripts for maintaining the website.

## update-latest-blog.js

Updates the homepage with the most recent blog post.

**Usage:**
```bash
npm run update-blog
```

**When to run:**
- After adding a new blog post to the `blog/` directory
- Before deploying the site to ensure the homepage shows your latest content

**What it does:**
1. Scans all markdown files in the `blog/` directory
2. Finds the most recent blog post by date (extracted from filename)
3. Updates `src/data/latestBlogPost.json` with the post's metadata
4. The homepage component automatically reads from this JSON file

**Note:** The script extracts the excerpt (text before `<!--truncate-->`) as the description shown on the homepage.
