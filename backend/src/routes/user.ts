import express from "express";
import { handleLoginUser, handleRegisterUser } from "../controller/user";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const router = express.Router();

router.post("/signup", handleRegisterUser);
router.post("/login", handleLoginUser);
// router.get("/profile", isAuthenticated, handl);

export default router;
