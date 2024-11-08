import express, { Request, Response } from "express";
import { createUser, userLogin, userSignup } from "../models/UserModel";
import { createResponse } from "../utils/response";
import httpStatus from "http-status";
import { message } from "../utils/message";

const signUp = async (req: Request, res: Response) => {
    try {
        const user = await userSignup(req.body);

        return await createResponse(
            res,
            httpStatus.CREATED,
            message.USER_CREATED.replace("#", "signup"),
            user
        );
    } catch (error: any) {
        return await createResponse(
            res,
            error.statusCode ? error.statusCode : httpStatus.SERVICE_UNAVAILABLE,
            error.message,
            {}
        );
    }
};

const login = async (req: Request, res: Response) => {
    try {
        const user = await userLogin(req.body);

        return await createResponse(
            res,
            httpStatus.OK,
            message.USER_CREATED.replace("#", "login"),
            {}
        );
    } catch (error: any) {
        return await createResponse(
            res,
            error.statusCode ? error.statusCode : httpStatus.SERVICE_UNAVAILABLE,
            error.message,
            {}
        );
    }
};

const addUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const newUser = await createUser(req.body);
        return res
            .status(201)
            .json({ message: "User created successfully!.", user: newUser });
    } catch (error) {
        return res.status(500).json({
            message: "Server is not working!",
            error: error,
        });
    }
};
export { signUp, login, addUser };
