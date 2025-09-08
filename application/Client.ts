import { RequestHolder } from "./requestHolder";
import { ArticlesController } from "./controllers/article.controller";
import { ProfileController } from "./controllers/profile.controller";
import { UserController } from "./controllers/user.controller";

export class Client extends RequestHolder {

    public get article() {
        return new ArticlesController(this.request);
    }

    public get user() {
        return new UserController(this.request);
    }

    public get profile() {
        return new ProfileController(this.request);
    }
}