import 'dotenv/config';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';

import { errorHandler } from './middlewares/error-handler.js';
import { addressRouter } from './modules/address/address-router.js';
import { authRouter } from './modules/auth/auth-router.js';
import { categoryRouter } from './modules/category/category-router.js';
import { orderRouter } from './modules/order/order-router.js';
import { productRouter } from './modules/product/product-router.js';

const app = express();
app.use( cors( { credentials: true, origin: [ process.env.FRONT_URL ] } ) );
app.use( cookieParser() );
app.use( express.json() );

app.use( '/auth', authRouter );
app.use( '/products', productRouter );
app.use( '/categories', categoryRouter );
app.use( '/addresses', addressRouter );
app.use( '/orders', orderRouter );

app.use( errorHandler );

mongoose.connect( process.env.MONGODB_URL );

app.listen( process.env.PORT, () => console.log( `Server is running on port ${process.env.PORT}` ) );

export default app;