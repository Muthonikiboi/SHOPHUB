// authRoutes.ts

import { Router } from "express";
import { getAllUsers, getUsersById, register,updateRetailer, updateSupplier,deleteUser, login ,registerAdmin ,protect ,restrictAccess, forgotPassword ,resetPassword} from "../Controllers/AuthController";

const router = Router();

router.post("/register", register);
router.post("/registerAdmin", registerAdmin)
router.post("/login",login)
router.post("/forgotPassword",forgotPassword)
router.patch("/resetPassword/:token",resetPassword);
router.get('/', protect,  restrictAccess('ADMIN'),getAllUsers);
router.patch("/upReal/:id", updateRetailer );
router.patch("/upSupp/:id", updateSupplier);
router.get('/:id',protect , restrictAccess('ADMIN'), getUsersById);
router.delete('/:id',protect, restrictAccess('ADMIN'), deleteUser);

export default router;
