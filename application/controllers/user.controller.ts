import { SignInRequest, SignUpRequest, UserResponse } from "../../models/user.model";
import { RequestHolder } from "../requestHolder";

export class UserController extends RequestHolder {

    private readonly endpoint = '/api/users';

    async login(payload: SignInRequest) {
        const response = await this.request.post(`${this.endpoint}/login`,{ 
            data: payload,
            failOnStatusCode: true,
        });
        const responseBody = response.json() as Promise<UserResponse>;
        return { response, responseBody };
    }

    async register(payload: SignUpRequest): Promise<UserResponse> {
        const response = await this.request.post(this.endpoint, { 
            data: payload,
            failOnStatusCode: true,
        });
        return response.json() as Promise<UserResponse>;
    }
}