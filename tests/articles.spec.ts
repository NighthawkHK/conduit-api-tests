import { expect } from "@playwright/test";
import { conduitTest } from "../fixtures/lazy.fixture";

conduitTest('should create article successfully', async ({ authClient: { article } }) => {
    const payload = {
        article: {
            title: 'Random title 4',
            description: 'lorem ipsum 5',
            body: 'lorem ipsum lorem ipsum 5',
        }
    }
    const responseBody = await article.create(payload);
    expect(responseBody.article.slug).toBeDefined();
});

TODO: "check pagination https://conduit-api.learnwebdriverio.com/api/articles?offset=0&limit=5&author=truedot"