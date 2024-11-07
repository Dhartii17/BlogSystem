import Joi from "joi";
import { message } from "../utils/message";


const userSignup = {
    body: Joi.object().keys({
        email: Joi.string().email({ minDomainSegments: 2 }).required().messages({
            'any.required': message.FIELD_REQUIRED.replace('#', 'Email'),
            'string.empty': message.VALID_INPUT.replace('#', 'email'),
            'string.email': message.VALID_INPUT.replace('#', "email")

        })
    })
}

export { userSignup }

