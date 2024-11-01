// authRoutes.ts

import { Router } from "express";
import { getAllUsers, register } from "../Controllers/AuthController";

const router = Router();

router.post("/register", register);
router.get('/users', getAllUsers);

export default router;
