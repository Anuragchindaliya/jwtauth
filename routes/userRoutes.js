import express from "express";
const router = express.Router();
import UserController from "../controllers/userController.js";
import checkUserAuth from "../middlewares/auth-middleware.js";

//public routes
router.post("/register", UserController.userRegistration);
router.post("/login", UserController.userLogin);
router.get("/userdata", checkUserAuth, UserController.getUserData)
router.get("/checkauth", UserController.checkAuth)
router.get("/logout", UserController.userLogout)

//Protected Routes

export default router;
