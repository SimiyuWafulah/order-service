import express from 'express';
import { createOrder, deleteOrder, getOrder, getOrderbyId, updateOrder} from '../controller/order.controller.js';
import { protect } from '../middleware/auth.js';


const router = express.Router();

router.post('/create-order',protect, createOrder);
router.get('/orders',protect, getOrder);
router.get('/orders/:id',protect,getOrderbyId);
router.put('/orders/:id',protect,updateOrder);
router.delete('/orders/:id',protect, deleteOrder)

export default router