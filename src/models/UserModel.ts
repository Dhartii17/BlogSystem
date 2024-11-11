import { PrismaClient } from '@prisma/client';
import { appError } from '../utils/appError';
import httpStatus from 'http-status';
import { message } from '../utils/message';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

const getUserByEmail = async (email: string) => {
    const user = await prisma.user.findMany({
        where: {
            email: email,
        },
    });
    return user;
};
const createUser = async (data: any) => {
    try {
        const { name, email, password } = data;
        const encryptedPwd = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                email: email,
                name: name,
                password: encryptedPwd,
            },
        });

        return user;
    } catch (error: any) {
        throw new appError(error.statusCode, error.message);
    }
};

const userSignup = async (data: any) => {
    try {
        const { name, email } = data;

        if (!email) {
            throw new appError(
                httpStatus.BAD_REQUEST,
                message.FIELD_REQUIRED.replace('#', 'email')
            );
        }

        const existUser = await getUserByEmail(email);

        if (existUser.length > 0) {
            throw new appError(
                httpStatus.BAD_REQUEST,
                message.USER_EXIST.replace('#', 'User')
            );
        }
        const newUser = await createUser(data);
        return newUser;
    } catch (error: any) {
        throw new appError(error.statusCode, error.message);
    }
};

const userLogin = async (data: any) => {
    try {
        const { email, password } = data;

        const CheckEmailExist = await getUserByEmail(email);

        if (CheckEmailExist.length <= 0) {
            throw new appError(
                httpStatus.BAD_REQUEST,
                message.USER_NOT_EXIST.replace('#', 'User')
            );
        }

        const dbPWD = await CheckEmailExist[0].password;

        const checkPassword = await bcrypt.compare(password, dbPWD);

        if (!checkPassword) {
            throw new appError(httpStatus.BAD_REQUEST, message.CHECK_CREDENTIALS);
        }

        return CheckEmailExist;
    } catch (error: any) {
        throw new appError(error.statusCode, error.message);
    }
};

const addBlog = async (bodyData: any, fileData: any) => {
    try {
        const { type, title, description, userId } = bodyData;

        if (!fileData || !fileData.path) {
            throw new appError(
                httpStatus.BAD_REQUEST,
                message.FIELD_REQUIRED.replace('#', 'Image')
            );
        }

        const filePath = await fileData.path;

        const blog = await prisma.blog.create({
            data: {
                type: type,
                title: title,
                description: description,
                userId: userId,
                blog_image: filePath,
            },
        });

        return blog;
    } catch (error: any) {
        throw new appError(error.statusCode, error.message);
    }
};
export { createUser, userSignup, addBlog, userLogin };
