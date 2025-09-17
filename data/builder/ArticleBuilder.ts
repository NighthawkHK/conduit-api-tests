import { Article } from "../../models/article.model";

export class ArticleBuilder {
    private article: Partial<Article> = {}

    setAuthor(author: Record<string, string>): this {
        this.article.author = author;
        return this;
    }

    setTitle(title: string): this {
        this.article.title = title;
        return this;
    }

    setDescription(description: string): this {
        this.article.description = description;
        return this;
    }

    setBody(body: string): this {
        this.article.description = body;
        return this;
    }

    setTagList(tagList: string[]): this {
        this.article.tagList = tagList;
        return this;
    }

    build(): Article {
        if (!this.article.title) {
            throw new Error('Article must have some title');
        }
        return {
            author: this.article.author || {},
            title: this.article.title,
            description: this.article.description || '',
            body: this.article.body || '',
            tagList: this.article.tagList || [],
        }
    }
}