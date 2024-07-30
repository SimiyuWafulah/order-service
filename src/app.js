import express from 'express';
import mongoose from 'mongoose';
import orderRouter from './routes/order.routes.js'
import dotenv from 'dotenv';

dotenv.config();

const app = express()
app.use(express.json());
app.use('/api', orderRouter)

mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connected to database');
}).catch((err) => {
    console.log(err)
});

export default app;