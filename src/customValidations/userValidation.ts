import Joi from 'joi';
import { message } from '../utils/message';

const userSignup = {
    body: Joi.object().keys({
        email: Joi.string()
            .email({ minDomainSegments: 2 })
            .required()
            .messages({
                'any.required': message.FIELD_REQUIRED.replace('#', 'Email'),
                'string.empty': message.VALID_INPUT.replace('#', 'email'),
                'string.email': message.VALID_INPUT.replace('#', 'email'),
            }),
        name: Joi.string().messages({
            'string.empty': message.VALID_INPUT.replace('#', 'name'),
        }),
        password: Joi.string()
            .required()
            .messages({
                'any.required': message.FIELD_REQUIRED.replace('#', 'Password'),
                'string.empty': message.VALID_INPUT.replace('#', 'password'),
            }),
    }),
};

const loginValidation = {
    body: Joi.object().keys({
        email: Joi.string()
            .email({ minDomainSegments: 2 })
            .required()
            .messages({
                'any.required': message.FIELD_REQUIRED.replace('#', 'Email'),
                'string.empty': message.VALID_INPUT.replace('#', 'email'),
                'email.string': message.VALID_INPUT.replace('#', 'email'),
            }),
        password: Joi.string()
            .required()
            .messages({
                'any.required': message.FIELD_REQUIRED.replace('#', 'Password'),
                'string.empty': message.VALID_INPUT.replace('#', 'password'),
                'password.string': message.VALID_INPUT.replace('#', 'password'),
            }),
    }),
};
const createBlogValidation = {
    body: Joi.object().keys({
        type: Joi.string()
            .required()
            .messages({
                'any.required': message.FIELD_REQUIRED.replace('#', 'Blog Type'),
                'string.empty': message.VALID_INPUT.replace('#', 'type'),
                'string.type': message.VALID_INPUT.replace('#', 'type'),
            }),
        title: Joi.string()
            .required()
            .messages({
                'any.required': message.FIELD_REQUIRED.replace('#', 'Title'),
                'string.empty': message.VALID_INPUT.replace('#', 'title'),
                'string.type': message.VALID_INPUT.replace('#', 'title'),
            }),
        description: Joi.string().messages({
            'any.required': message.FIELD_REQUIRED.replace('#', 'Description'),
            'string.empty': message.VALID_INPUT.replace('#', 'description'),
            'string.description': message.VALID_INPUT.replace('#', 'description'),
        }),
        userId: Joi.string()
            .required()
            .messages({
                'any.required': message.FIELD_REQUIRED.replace('#', 'User id'),
                'string.empty': message.VALID_INPUT.replace('#', 'user id'),
            }),
        image: Joi.object()
            .keys({
                mimetype: Joi.string()
                    .valid('image/jpeg', 'image/png', 'image/gif') // Add other valid types as needed
                    .required()
                    .messages({
                        'any.required': message.FIELD_REQUIRED.replace('#', 'Image'),
                        'any.invalid': message.VALID_INPUT.replace('#', 'Image'),
                    }),
            })
            .optional(), // This is optional, make it required if necessary
    }),
};
export { userSignup, loginValidation, createBlogValidation };
