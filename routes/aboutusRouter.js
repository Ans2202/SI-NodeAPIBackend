import express from "express";
import { getAboutUsPage } from "../controllers/aboutusController.js";

const aboutusRouter = express.Router();
aboutusRouter.get('/',getAboutUsPage)
export {aboutusRouter};