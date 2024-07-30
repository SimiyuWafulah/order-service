import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userID : {type : mongoose.Schema.Types.ObjectId, Ref: 'User', required: true},
    items : [{
        productId : {type : mongoose.Schema.Types.ObjectId, Ref: 'Product', required : true},
        quantity : {type :Number , required: true},
        price : {type: Number, required: true}
    }],
    total : {type: Number,  required: true},
    status : {type: String, default : 'Pending'},
    shippingAddress: {type: String, required: true},
    paymentMethod: {type : String, required : true},
    createdAt : {type : Date, default : Date.now},
    updatedAt : {type: Date, default : Date.now}
}, {timestamps : true});

const Order = mongoose.model('Order', orderSchema);

export default Order