import { request, test as base } from "@playwright/test";
import { Client } from "../application/Client";
import fs from 'fs';
import { UserFactory } from "../data/factory/UserFactory";
import { ArticleBuilder } from "../data/builder/ArticleBuilder";

type ConduitFixture = {
    client: Client;
    authClient: Client;
    userToken: string;
    articleSlug: string;
}

export const conduitTest = base.extend<ConduitFixture>({
    client: async ({ request }, use) => {
        const client = new Client(request);
        await use(client);
    },

    authClient: async ({ userToken }, use) => {
        const ctx = await request.newContext({
            extraHTTPHeaders: {
                Authorization: `Bearer ${userToken}`,
            },
        });
        const client = new Client(ctx);
        await use(client);
        await ctx.dispose();
    },

    userToken: async ({ client }, use) => {
        let token: string;
        const tokenFilePath = '.token';
        const { email, password, username } = UserFactory.createEnvUser();

        const registerAndSaveToken = async () => {
            const responseBody = await client.user.register(email, password, username);
            const token = responseBody.user.token;
            fs.writeFileSync(tokenFilePath, token);
            return token;
        };

        if (fs.existsSync(tokenFilePath)) {
            token = fs.readFileSync(tokenFilePath, { encoding: 'utf-8' });
            const { isSuccessful } = await client.user.login(email, password);
            if (!isSuccessful) {
                fs.unlinkSync(tokenFilePath);
                token = await registerAndSaveToken();
            }
        } else {
            token = await registerAndSaveToken();
        }
        await use(token);
    },

    articleSlug: async ({ authClient }, use) => {
        const responseBody = await authClient.article.create(
            new ArticleBuilder()
                .setTitle('Article to be deleted')
                .build()
        );
        const slug = responseBody.article.slug;
        await use(slug);
        await authClient.article.delete(slug);
    }
})