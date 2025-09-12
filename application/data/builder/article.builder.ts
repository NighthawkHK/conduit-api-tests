import { Article } from "../../../models/article.model";

export class ArticleBuilder {

    private _author: Record<string, string> = {};
    private _title = '';
    private _description = '';
    private _body = '';
    private _tagList: string[] = [];

    setAuthor(author: Record<string, string>): this {
        this._author = author;
        return this;
    }

    setTitle(title: string): this {
        this._title = title;
        return this;
    }

    setDescription(description: string): this {
        this._description = description;
        return this;
    }

    setBody(body: string): this {
        this._body = body;
        return this;
    }

    setTagList(tagList: string[]): this {
        this._tagList = tagList;
        return this;
    }

    build(): Article {
        if (!this._title) {
            throw new Error('Article must have some title');
        }
        return {
            author: this._author,
            title: this._title,
            description: this._description,
            body: this._body,
            tagList: this._tagList,
        }
    }
}