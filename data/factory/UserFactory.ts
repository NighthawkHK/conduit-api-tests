import { faker } from '@faker-js/faker';
import { randomUUID } from 'crypto';
import env from '../../env';

export class UserFactory {
    
    static createValidUser() {
        return {
            email: faker.internet.email().toLowerCase(),
            password: '1234',
            username: `testuser${randomUUID().replace(/-/g, "").slice(0, 8)}`,
        }
    }

    static createEnvUser() {
        return {
            email: env.USER_EMAIL,
            password: env.USER_PASSWORD,
            username: env.USER_USERNAME
        }
    }
}