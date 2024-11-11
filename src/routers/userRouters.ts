import express, { Request, Response } from 'express';
import {
    addUser,
    createBlog,
    login,
    signUp,
} from '../controller/UserController';
import { validate } from './../middleware/Validate';
import {
    createBlogValidation,
    loginValidation,
    userSignup,
} from '../customValidations/userValidation';
import { upload } from '../middleware/multerConfig';
const router = express.Router();

router.post('/signup', validate(userSignup), signUp);
router.post('/login', validate(loginValidation), login);
router.post('/createUser', addUser);
router.post(
    '/createBlog',
    upload.single('blog_image'),
    validate(createBlogValidation),
    createBlog
);

export default router;
