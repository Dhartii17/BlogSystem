import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { appError } from "../utils/appError";
import httpStatus from "http-status";
import { message } from "../utils/message";
const prisma = new PrismaClient();

const getUserByEmail = async (email: string) => {
    const user = await prisma.user.findMany({
        where: {
            email: email,
        },
    });
    return user;
};
const userSignup = async (data: any) => {
    try {
        console.log("data", data);

        const { name, email } = data;
        console.log("fname", name);
        console.log("email", email);

        if (!email) {
            throw new appError(
                httpStatus.BAD_REQUEST,
                message.FIELD_REQUIRED.replace("#", "email")
            );
        }

        const existUser = await getUserByEmail(email);
        console.log("existUser", existUser);
        console.log("existUser", existUser.length);
        if (existUser.length > 0) {
            throw new appError(httpStatus.BAD_REQUEST, message.USER_EXIST);
        }

        const newUser = await createUser(data);

        return newUser;
    } catch (error: any) {
        throw new appError(error.statusCode, error.message);
    }
};

const createUser = async (data: any) => {
    try {
        const { name, email, password } = data;
        console.log("fname", name, email);

        if (!email) {
            throw new appError(
                httpStatus.BAD_REQUEST,
                message.FIELD_REQUIRED.replace("#", "Email")
            );
        }

        const user = await prisma.user.create({
            data: {
                email: email,
                name: name,
                password: password,
            },
        });

        return user;
    } catch (error: any) {
        throw new appError(error.statusCode, error.message);
    }
};

const addBlog = async (bodyData: any, fileData: any) => {
    try {
        const { type, title, description, userId } = bodyData;
        console.log("body Data", type, title, description, userId);

        if (!fileData.path) {
            throw new appError(
                httpStatus.BAD_REQUEST,
                message.FIELD_REQUIRED.replace("#", "image")
            );
        }
        const filePath = await fileData.path;

        console.log("fileds Data", fileData);
        console.log("path", fileData.path);

        const blog = await prisma.blog.create({
            data: {
                type: type,
                title: title,
                description: description,
                userId: userId,
                blog_image: filePath,
            },
        });

        console.log("blog created", blog);

        return blog;
    } catch (error: any) {
        throw new appError(error.statusCode, error.message);
    }
};
export { createUser, userSignup, addBlog };
