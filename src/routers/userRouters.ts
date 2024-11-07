import express, { Request, Response } from 'express';
import { addUser, signUp } from "../controller/UserController";
import { validate } from "./../middleware/Validate";
import { userSignup } from '../customValidations/userValidation';
const router = express.Router();

router.post("/signup", validate(userSignup), signUp)
router.post("/createUser", addUser);

export default router;
