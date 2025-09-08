import { expect } from '@playwright/test';
import { UserFactory } from '../application/data/factory/user.factory';
import { getEnvCredentials } from '../utils/env.helper';
import { conduitTest } from '../fixtures/lazy.fixture';

conduitTest('should create user successfully', async ({ client: { user } }) => {
    const payload = {
        user: UserFactory.createValidUser()
    }
    const responseBody = await user.register(payload);
    expect(responseBody).toMatchObject({
        user: {
            username: payload.user.username,
            email: payload.user.email,
            token: expect.any(String)
        }
    })
});

conduitTest('should login successfully', async ({ client: { user } }) => {
    const credentials = getEnvCredentials();
    const payload = {
        user: {
            email: credentials.email,
            password: credentials.password
        }
    };
    const { responseBody } = await user.login(payload);
    expect((await responseBody).user.token).toBeDefined();
});