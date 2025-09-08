import { Profile } from "../../models/profile.model";
import { EditUserRequest } from "../../models/user.model";
import { RequestHolder } from "../requestHolder";

export class ProfileController extends RequestHolder {

    private readonly endpoint = '/api/user';

    async edit(payload: EditUserRequest) {
        const response = await this.request.put(this.endpoint, {
            data: payload,
        })
        return response;
    }

    async open(userName: string): Promise<Profile> {
        const response = await this.request.get(`/api/profiles/${userName}`);
        return response.json() as Promise<Profile>;
    }

    async followUser(userName: string): Promise<Profile> {
        const response = await this.request.post(`/api/profiles/${userName}/follow`);
        return response.json() as Promise<Profile>;
    }

    async unfollowUser(userName: string): Promise<Profile> {
         const response = await this.request.delete(`/api/profiles/${userName}/follow`);
        return response.json() as Promise<Profile>;
    }
}