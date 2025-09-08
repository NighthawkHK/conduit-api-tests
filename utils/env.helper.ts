export function getEnvCredentials() { 
    const email = process.env.USER_EMAIL;
    const password = process.env.USER_PASSWORD;

    if (!email || !password) {
        throw new Error('USER_EMAIL and USER_PASSWORD must be set in environment variables');
    }
    return { email, password };
}