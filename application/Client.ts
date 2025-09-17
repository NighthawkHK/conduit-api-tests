import { RequestHolder } from "./RequestHolder";
import { ArticlesController } from "./controllers/ArticleController";
import { ProfileController } from "./controllers/ProfileController";
import { UserController } from "./controllers/UserController";

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