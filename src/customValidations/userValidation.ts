import Joi from "joi";
import { message } from "../utils/message";

const userSignup = {
    body: Joi.object().keys({
        email: Joi.string()
            .email({ minDomainSegments: 2 })
            .required()
            .messages({
                "any.required": message.FIELD_REQUIRED.replace("#", "Email"),
                "string.empty": message.VALID_INPUT.replace("#", "email"),
                "string.email": message.VALID_INPUT.replace("#", "email"),
            }),
        name: Joi.string().messages({
            "string.empty": message.VALID_INPUT.replace("#", "name"),
        }),
        password: Joi.string()
            .required()
            .messages({
                "any.required": message.FIELD_REQUIRED.replace("#", "Password"),
                "string.empty": message.VALID_INPUT.replace("#", "password"),
            }),
    }),
};

const loginValidation = {
    body: Joi.object().keys({
        email: Joi.string()
            .email({ minDomainSegments: 2 })
            .required()
            .messages({
                "any.required": message.FIELD_REQUIRED.replace("#", "Email"),
                "string.empty": message.VALID_INPUT.replace("#", "email"),
                "email.string": message.VALID_INPUT.replace("#", "email"),
            }),
        password: Joi.string()
            .required()
            .messages({
                "any.required": message.FIELD_REQUIRED.replace("#", "Password"),
                "string.empty": message.VALID_INPUT.replace("#", "password"),
                "password.string": message.VALID_INPUT.replace("#", "password"),
            }),
    }),
};

export { userSignup, loginValidation };
