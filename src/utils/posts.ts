import { getCollection, type CollectionEntry } from 'astro:content';
import { getTopicFromPath, type TopicKey } from './topics';

export type PostEntry = CollectionEntry<'posts'>;

export async function getPublishedPosts(): Promise<PostEntry[]> {
  const posts = await getCollection('posts');

  return posts
    .filter(({ data }) => !data.draft)
    .sort((firstPost, secondPost) => secondPost.data.pubDate.valueOf() - firstPost.data.pubDate.valueOf());
}

export function getPostTopic(post: Pick<PostEntry, 'id'>): TopicKey {
  return getTopicFromPath(post.id);
}

export function getPostSlug(post: Pick<PostEntry, 'id'>): string {
  const segments = post.id.split('/');
  const filename = segments[segments.length - 1] ?? '';
  const basename = filename.replace(/\.mdx?$/i, '');

  if (basename === 'index' && segments.length > 2) {
    return segments[segments.length - 2]!;
  }

  return basename;
}

export function getPostUrl(post: Pick<PostEntry, 'id'>): string {
  return `/topic/${getPostTopic(post)}/${getPostSlug(post)}`;
}

export function getTopicUrl(topic: string): string {
  return `/topic/${topic}`;
}

export function getFeaturedPost(posts: PostEntry[]): PostEntry | undefined {
  return posts.find((post) => post.data.featured) ?? posts[0];
}
