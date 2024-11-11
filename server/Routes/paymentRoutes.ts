import express from 'express';
import { createToken } from "../Controllers/paymentController";
import {postStkPush} from "../Controllers/paymentController";
import {callback }from "../Controllers/paymentController";
const router = express.Router();

router.post('/stkpush',createToken,postStkPush);
router.post('/callback/:id',createToken,callback);

export default router;