import express from "express";
import { registerUser,loginUser } from "../controllers/UserController.js";

const usersRouter= express.Router();

usersRouter.post('/register', registerUser);
usersRouter.get('/login', loginUser);


export default usersRouter;