import { ArticleRequest, ArticleResponse } from "../../models/article.model";
import { RequestHolder } from "../requestHolder";

export class ArticlesController extends RequestHolder {

    private readonly endpoint = '/api/articles';

    async create(payload: ArticleRequest): Promise<ArticleResponse> {
        const response = await this.request.post(this.endpoint, {
            data: payload,
        });
        return response.json() as Promise<ArticleResponse>;
    }

    async edit(payload: ArticleRequest, slug: string): Promise<ArticleResponse> {
        const response = await this.request.put(`${this.endpoint}/${slug}`, {
            data: payload
        });
        return response.json() as Promise<ArticleResponse>;
    }

    async delete(slug: string) {
        return this.request.delete(`${this.endpoint}/${slug}`);
    }

    async get(slug: string): Promise<ArticleResponse> {
        const response = await this.request.get(`${this.endpoint}/${slug}`);
        return response.json() as Promise<ArticleResponse>;
    }

    async addToFavorites(slug: string): Promise<ArticleResponse> {
        const response = await this.request.post(`${this.endpoint}/${slug}/favorite`);
        return response.json() as Promise<ArticleResponse>;
    }

    async removeFromFavorites(slug: string): Promise<ArticleResponse> {
        const response = await this.request.delete(`${this.endpoint}/${slug}/favorite`);
        return response.json() as Promise<ArticleResponse>;
    }
}