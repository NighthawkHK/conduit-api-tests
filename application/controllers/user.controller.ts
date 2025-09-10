import { UserResponse, RegisterResponse } from "../../models/user.model";
import { RequestHolder } from "../requestHolder";

export class UserController extends RequestHolder {

    private readonly endpoint = '/api/users';

    async login(email: string, password: string) {
        const response = await this.request.post(`${this.endpoint}/login`, {
            data: {
                user: { email, password, }
            },
        });
        const responseBody = response.json() as Promise<UserResponse>;
        return { isSuccessful: response.ok(), responseBody };
    }

    async register(email: string, password: string, username: string): Promise<RegisterResponse> {
        const response = await this.request.post(this.endpoint, {
            data: {
                user: { email, password, username }
            },
        });
        return response.json() as Promise<RegisterResponse>;
    }
}