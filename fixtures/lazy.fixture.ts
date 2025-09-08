import { request, test as base } from "@playwright/test";
import { Client } from "../application/Client";
import fs from 'fs';
import { UserFactory } from "../application/data/factory/user.factory";

type ConduitFixture = {
    client: Client;
    authClient: Client;
    userToken: string;
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
        const email = process.env.USER_EMAIL as string;
        const password = process.env.USER_PASSWORD as string;
        
        const registerAndSaveToken = async () => {
            const responseBody = await client.user.register({
                user: UserFactory.createEnvUser()
            });
            const token = responseBody.user.token;
            fs.writeFileSync(tokenFilePath, token);
            return token;
        };

        if (fs.existsSync(tokenFilePath)) {
            token = fs.readFileSync(tokenFilePath, { encoding: 'utf-8' });
            const { response } = await client.user.login({
                user: { email, password }
            });
            if (!response.ok()) {
                fs.unlinkSync(tokenFilePath);
                token = await registerAndSaveToken();
            }
        } else {
            token = await registerAndSaveToken();
        }
        await use(token);
    },
})