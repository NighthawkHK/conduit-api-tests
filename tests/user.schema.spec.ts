import { expect } from "@playwright/test";
import { UserFactory } from "../data/factory/UserFactory";
import { conduitTest } from "../fixtures/lazy.fixture";
import { userResponseBodySchema } from "../schemas/user.schema";

conduitTest('should fail to login with invalid credentials', async ({ client: { user } }) => {
    const currentUser = UserFactory.createEnvUser();
    const { responseBody } = await user.login(currentUser.email, currentUser.password);
    expect(userResponseBodySchema.validate(responseBody)).toBeDefined();
});