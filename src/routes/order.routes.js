import express from 'express';
import { createOrder, deleteOrder, getOrder, getOrderbyId, updateOrder} from '../controller/order.controller.js';


const router = express.Router();

router.post('/create-order', createOrder);
router.get('/orders', getOrder);
router.get('/orders/:id', getOrderbyId);
router.put('/orders/:id',updateOrder);
router.delete('/orders/:id', deleteOrder)

export default router