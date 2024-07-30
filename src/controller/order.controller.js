import Order from '../model/order.model.js'
import {errorHandler} from '../middleware/errorHandler.js'
import Joi from 'joi'


//Validating schema
const orderSchema = Joi.object({
    UserId: Joi.string().required(),
    items : Joi.array().items(Joi.object({
        productId : Joi.string().required(),
        quantity : Joi.number().required(),
        price : Joi.number().required()
    })).required(),
    total : Joi.number().required(),
    status: Joi.string(),
    shippingAddress : Joi.string().required(),
    paymentMethod : Joi.string().required()
})

//create order
export const createOrder = async (req, res, next) => {
    try{
        const {error} = orderSchema.validate(req.body);
        if (error){
            return next(errorHandler(400, 'Validation failed'))
        }else{
            const newOrder = new Order(req.body);
            await newOrder.save();
            res.status(200).json('Order created successfully')
        }
    }catch(error){
        next(error)
    }
};

//get order
export const getOrder = async (req, res, next) => {
    try{
        const orders =  await Order.find().populate('UserId', 'name').populate('items.productId', 'name');
        res.status(200).json({orders : orders})
    }catch(error){
        next(error)
    }
};

//get order by id
export const getOrderbyId = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).populate('UserId', 'name').populate('items.productId', 'name')
        if(!order) {
            return next(errorHandler(400, 'Order not found'))
        }else{
            res.status(200).json({order: order})
        }
    } catch (error) {
        next(error)
    }
}

//update order
export const updateOrder = async (req,res, next) => {
    try {
       const {error} = orderSchema.validate(req.body);
       if (error) {
        return next (errorHandler(404, 'Order update validation failed'))
       }else{
        const updateOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!updateOrder) return next(errorHandler(404, 'Order to update not found'))
        res.status(200).json({updated : updateOrder})
       }
    } catch (error) {
        next(error)
    }
}

//delete order
export const deleteOrder = async (req, res, next) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if(!deletedOrder){
            return next(errorHandler(404, 'Order to delete no found'))
        }
        res.status(200).json('Order deleted')
    } catch (error) {
        next(error)
    }
}