import { Router } from "express";
import { login, logout, signup,updateProfile } from "../../controllers/auth.controller.ts";
import { protectRoute } from "../../middleware/auth.middleware.ts";

const authRouter = Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.put("/update-profile", protectRoute, updateProfile);
authRouter.get("/check", protectRoute, (req, res) => res.status(200).json(req.user));

export default authRouter;
