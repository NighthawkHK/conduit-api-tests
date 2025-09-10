import { expect } from "@playwright/test";
import { conduitTest } from "../fixtures/lazy.fixture";
import { ArticleBuilder } from "../application/data/builder/article.builder";

conduitTest('should successfully create an article', async ({ authClient: { article } }) => {
    const articleToCreate = new ArticleBuilder().setTitle('Test Article').build();
    const responseBody = await article.create({ article: articleToCreate });
    expect(responseBody.article.slug).toBeDefined();
});

