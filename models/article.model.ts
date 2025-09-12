export interface ArticleResponse {
    article: ArticleInfo;
}

export interface ArticlesResponse {
    articles: ArticleInfo[];
    articlesCount: number;
}

export interface ArticleInfo {
    slug: string;
    title: string;
    description: string;
    body: string;
    createdAt: string;
    updatedAt: string;
    tagList: string[];
    favorited: boolean;
    favoritesCount: number;
    author: Author;
}

export interface Article {
    author: Record<string, string>;
    title: string;
    description: string;
    body: string;
    tagList: string[];
}

export interface Author {
    username: string;
    image: string;
    bio?: string;
    following: boolean;
}