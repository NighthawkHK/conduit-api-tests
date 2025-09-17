import Joi from "joi";
import { SignInUser } from "../models/user.model";

export const userResponseBodySchema = Joi.object<SignInUser>({
    username: Joi.string().alphanum().required(),
    email: Joi.string().email().required(),
    token: Joi.string().required(),
})