import { faker } from '@faker-js/faker';
import { randomUUID } from 'crypto';

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
            email: process.env.USER_EMAIL as string,
            password: process.env.USER_PASSWORD as string,
            username: process.env.USER_NAME as string,
        }
    }
}

