export interface SignUpRequest {
    user: {
        email: string,
        password: string,
        username: string,
    }
}

export interface SignInRequest {
    user: {
        email: string,
        password: string,
    }
}

export interface UserResponse {
    user: {
        username: string,
        email: string,
        token: string,
    }
}

export interface EditUserRequest {
    email?: string,
    username?: string,
    bio?: string,
    image?: string,
    password?: string
}