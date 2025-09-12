import { expect } from "@playwright/test";
import { conduitTest } from "../fixtures/lazy.fixture";
import { ArticleBuilder } from "../application/data/builder/article.builder";
import { faker } from "@faker-js/faker";

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

for (const { articleEntity } of testData) {
   conduitTest(`should successfully create an article with title ${articleEntity.title}`, async ({ authClient: { article } }) => {
    const responseBody = await article.create(articleEntity);
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
}
