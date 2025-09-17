import { Article, ArticleResponse } from "../../models/article.model";
import { step } from "../../utils/step";
import { RequestHolder } from "../RequestHolder";

export class ArticlesController extends RequestHolder {
    private readonly endpoint = '/api/articles';

    @step('Create new article')
    async create(article: Article): Promise<ArticleResponse> {
        const response = await this.request.post(this.endpoint, {
            data: { article },
        });
        return response.json() as Promise<ArticleResponse>;
    }

    @step('Edit article with slug: {1}')
    async edit(article: Article, slug: string): Promise<ArticleResponse> {
        const response = await this.request.put(`${this.endpoint}/${slug}`, {
            data: { article },
        });
        return response.json() as Promise<ArticleResponse>;
    }

    @step('Delete article with slug: {0}')
    async delete(slug: string) {
        return this.request.delete(`${this.endpoint}/${slug}`);
    }

    @step('Get article with slug: {0}')
    async get(slug: string): Promise<ArticleResponse> {
        const response = await this.request.get(`${this.endpoint}/${slug}`);
        return response.json() as Promise<ArticleResponse>;
    }

    @step('Add article with slug: {0} to favorites')
    async addToFavorites(slug: string): Promise<ArticleResponse> {
        const response = await this.request.post(`${this.endpoint}/${slug}/favorite`);
        return response.json() as Promise<ArticleResponse>;
    }

    @step('Remove article with slug: {0} from favorites')
    async removeFromFavorites(slug: string): Promise<ArticleResponse> {
        const response = await this.request.delete(`${this.endpoint}/${slug}/favorite`);
        return response.json() as Promise<ArticleResponse>;
    }
}