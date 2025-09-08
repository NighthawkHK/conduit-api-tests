export interface ArticleResponse {
    article: Article;
}

export interface ArticleRequest {
    article: {
        author?: {};
        title: string;
        description: string;
        body: string;
        tagList?: [];
    }
}

export interface ArticlesResponse {
    articles: Article[];
    articlesCount: number;
}

interface Article {
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

interface Author {
    username: string;
    image: string;
    bio?: string;
    following: boolean;
}