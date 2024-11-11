import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { pick } from 'lodash';
import { createResponse } from '../utils/response';
import httpStatus from 'http-status';

// Correct type for `validate` middleware
const validate = (schema: any) => {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const validateSchema = pick(schema, ['params', 'query', 'body']);
        const object = pick(req, Object.keys(validateSchema));
        const { value, error } = Joi.compile(validateSchema)
            .prefs({ errors: { label: 'key' } })
            .validate(object);

        if (error) {
            const errorMessage = error.details
                .map((details) => details.message)
                .join(',');
            return await createResponse(
                res,
                httpStatus.BAD_REQUEST,
                errorMessage,
                {}
            );
        }

        Object.assign(req, value);
        return next();
    };
};

export { validate };
