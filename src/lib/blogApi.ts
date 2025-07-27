import { BlogPost, MediumArticle, RSS2JSONResponse } from "@/types";

const MEDIUM_RSS_URL = 'https://medium.com/feed/@vasanthancomrads';
const RSS2JSON_API = 'https://api.rss2json.com/v1/api.json';

export class BlogApiError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'BlogApiError';
  }
}

export const fetchMediumArticles = async (): Promise<BlogPost[]> => {
  try {
    const response = await fetch(
      `${RSS2JSON_API}?rss_url=${encodeURIComponent(MEDIUM_RSS_URL)}`,
      {
        next: { revalidate: 3600 }, // Revalidate every hour
      }
    );

    if (!response.ok) {
      throw new BlogApiError(
        `Failed to fetch articles: ${response.statusText}`,
        response.status
      );
    }

    const data: RSS2JSONResponse = await response.json();

    if (data.status !== 'ok') {
      throw new BlogApiError('RSS2JSON API returned an error');
    }

    return data.items.map(transformMediumArticle);
  } catch (error) {
    console.error('Error fetching Medium articles:', error);
    
    if (error instanceof BlogApiError) {
      throw error;
    }
    
    throw new BlogApiError('Failed to fetch blog articles');
  }
};

const transformMediumArticle = (article: MediumArticle): BlogPost => {
  // Extract thumbnail from content or use enclosure
  const thumbnail = extractThumbnail(article);
  
  // Calculate read time (rough estimate: 200 words per minute)
  const wordCount = article.content.split(' ').length;
  const readTime = Math.ceil(wordCount / 200);

  // Clean description
  const description = stripHtml(article.description).substring(0, 160);

  return {
    id: article.guid,
    title: article.title,
    description,
    content: article.content,
    publishedAt: article.pubDate,
    author: article.author,
    readTime,
    thumbnail,
    url: article.link,
    tags: article.categories || [],
    isExternal: true,
  };
};

const extractThumbnail = (article: MediumArticle): string => {
  // Try enclosure first
  if (article.enclosure?.link) {
    return article.enclosure.link;
  }

  // Try to extract from content
  const imgRegex = /<img[^>]+src="([^">]+)"/i;
  const match = article.content.match(imgRegex);
  
  if (match && match[1]) {
    return match[1];
  }

  // Fallback to a default image
  return '/images/blog-default.jpg';
};

const stripHtml = (html: string): string => {
  return html.replace(/<[^>]*>/g, '').trim();
};

// Cache for articles
let cachedArticles: BlogPost[] | null = null;
let cacheTime: number = 0;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

export const getCachedArticles = async (): Promise<BlogPost[]> => {
  const now = Date.now();
  
  if (cachedArticles && (now - cacheTime) < CACHE_DURATION) {
    return cachedArticles;
  }

  try {
    cachedArticles = await fetchMediumArticles();
    cacheTime = now;
    return cachedArticles;
  } catch (error) {
    // Return cached articles if available, even if stale
    if (cachedArticles) {
      console.warn('Using stale cached articles due to fetch error');
      return cachedArticles;
    }
    throw error;
  }
};

// Utility functions for blog data
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatReadTime = (minutes: number): string => {
  return `${minutes} min read`;
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

export const getExcerpt = (content: string, maxLength: number = 150): string => {
  const plainText = stripHtml(content);
  return truncateText(plainText, maxLength);
};