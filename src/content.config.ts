import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const postsCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    featured: z.boolean().optional(),
    draft: z.boolean().optional(),
  }),
});

export const collections = {
  posts: postsCollection,
};
