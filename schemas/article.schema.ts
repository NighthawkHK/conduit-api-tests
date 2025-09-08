import Joi from "joi";

export class ArticleSchema {
    static readonly response = Joi.object({
        article: Joi.object({
            slug: Joi.string().required()
        })
    })
}