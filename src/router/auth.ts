import { authController } from "@/controller/auth";
import { applyAuthentication } from "@/middleware/authentication";
import express from "express";
const router = express.Router();

router.post("/register", applyAuthentication, authController.register);
router.post("/login", applyAuthentication, authController.login);
router.get("/user", applyAuthentication, authController.getUser);

export default router;
