import { expect } from '@playwright/test';
import { UserFactory } from '../application/data/factory/UserFactory';
import { conduitTest } from '../fixtures/lazy.fixture';
import { Tag } from '../application/tags';
import { faker } from '@faker-js/faker';

conduitTest.describe('User Management', { tag: Tag.User }, () => {

    conduitTest('should successfully create a new user',
        {
            tag: [Tag.Smoke],
        },
        async ({ client: { user } }) => {
            const { email, password, username } = UserFactory.createValidUser();
            const responseBody = await user.register(email, password, username);
            expect(responseBody).toMatchObject({
                user: {
                    username: username,
                    email: email,
                    token: expect.any(String),
                }
            })
        });

    conduitTest('should successfully login into account',
        {
            tag: [Tag.Smoke],
        },
        async ({ client: { user } }) => {
            const { email, password } = UserFactory.createEnvUser();
            const { responseBody } = await user.login(email, password);
            expect((await responseBody).user.token).toBeDefined();
        });

    conduitTest.fail('should successfully update user information', {
        annotation: [
            {
                type: 'jira',
                description: 'CDT-0001',
            },
            {
                type: 'issue',
                description: 'returns 500 after saving valid changes',
            },
        ],
    }, async ({ authClient: { profile } }) => {
        const currentUser = UserFactory.createEnvUser();
        const responseBody = await profile.edit({
            email: currentUser.email,
            username: currentUser.username,
            bio: faker.lorem.sentence(),
            image: faker.image.avatar(),
            password: currentUser.password,
        });
        expect(responseBody.ok()).toBeTruthy();
    })
});