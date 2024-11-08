import express, { Request, Response } from "express";
import { addUser, login, signUp } from "../controller/UserController";
import { validate } from "./../middleware/Validate";
import {
    loginValidation,
    userSignup,
} from "../customValidations/userValidation";
const router = express.Router();

router.post("/signup", validate(userSignup), signUp);
router.post("/login", validate(loginValidation), login);
router.post("/createUser", addUser);

export default router;
