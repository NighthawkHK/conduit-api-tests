import { expect } from "@playwright/test";
import { conduitTest } from "../fixtures/lazy.fixture";
import { ArticleBuilder } from "../data/builder/ArticleBuilder";
import { faker } from "@faker-js/faker";
import { Tag } from '../application/tags';

const testData = [
    {
        articleEntity: new ArticleBuilder()
            .setTitle('Test Article 1')
            .setDescription(faker.lorem.sentence())
            .setBody(faker.lorem.paragraphs(2))
            .setTagList([faker.lorem.word(), faker.lorem.word()])
            .build(),
    },
    {
        articleEntity: new ArticleBuilder()
            .setTitle('Test Article 2')
            .build(),
    },
    {
        articleEntity: new ArticleBuilder()
            .setTitle('Test Article 3')
            .setBody(faker.lorem.paragraphs(2))
            .setTagList([faker.lorem.word()])
            .build(),
    },
]

conduitTest.describe('Article Management', { tag: Tag.Article }, () => {
    let articleSlug: string;

    conduitTest.afterEach(async ({ authClient: { article } }) => {
        if (articleSlug) {
            const isDeleted = await article.delete(articleSlug);
            expect(isDeleted).toBeTruthy();
        }
    });

    for (const { articleEntity } of testData) {
        conduitTest(`should successfully create an article with title ${articleEntity.title}`,
            { tag: Tag.User },
            async ({ authClient: { article } }) => {
                const responseBody = await article.create(articleEntity);
                articleSlug = responseBody.article.slug;

                expect(responseBody).toMatchObject({
                    article: {
                        slug: expect.any(String),
                        title: articleEntity.title,
                        description: articleEntity.description,
                        body: articleEntity.body,
                        tagList: articleEntity.tagList,
                        createdAt: expect.any(String),
                        updatedAt: expect.any(String),
                        favorited: false,
                        favoritesCount: 0,
                        author: expect.any(Object),
                    }
                });
            });
    };

    conduitTest(`should successfully update an article`, async ({ authClient: { article }, articleSlug }) => {
        const responseBody = await article.edit(
            new ArticleBuilder()
                .setTitle('Updated Title')
                .build(),
            articleSlug
        );
        expect(responseBody.article.title).toBe('Updated Title');
    });

    conduitTest(`should successfully get an article`, async ({ authClient: { article }, articleSlug }) => {
        const responseBody = await article.get(articleSlug);
        expect(responseBody.article.title).toBe('Article to be deleted');
    });
});