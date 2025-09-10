import { ErrorResponse } from './error.model';

export interface SignInUser {
    username: string,
    email: string,
    token: string,
}

export interface UserResponse {
    user: SignInUser;
}

export interface EditUserRequest {
    email?: string,
    username?: string,
    bio?: string,
    image?: string,
    password?: string
}

export type RegisterResponse = UserResponse | ErrorResponse;