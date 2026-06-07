import 'dotenv/config';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { rateLimit } from 'express-rate-limit';
import { slowDown } from 'express-slow-down';
import mongoose from 'mongoose';

import { errorHandler } from './middlewares/error-handler.js';
import { addressRouter } from './modules/address/address-router.js';
import { authRouter } from './modules/auth/auth-router.js';
import { categoryRouter } from './modules/category/category-router.js';
import { imageRouter } from './modules/image/image-router.js';
import { orderRouter } from './modules/order/order-router.js';
import { productRouter } from './modules/product/product-router.js';

const app = express();

const apiLimiter = rateLimit( {
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true
} );

const speedLimiter = slowDown( {
  windowMs: 15 * 60 * 1000,
  delayAfter: 50,
  delayMs: hits => ( hits - 50 ) * 500
} );

app.use( cors( { credentials: true, origin: [ process.env.FRONT_URL ] } ) );
app.use( cookieParser() );
app.use( express.json() );
app.use( express.static( 'uploads' ) );

app.use( apiLimiter );
app.use( speedLimiter );

app.use( '/auth', authRouter );
app.use( '/images', imageRouter );
app.use( '/products', productRouter );
app.use( '/categories', categoryRouter );
app.use( '/addresses', addressRouter );
app.use( '/orders', orderRouter );

app.use( errorHandler );

mongoose.connect( process.env.MONGODB_URL );

app.listen( process.env.PORT, () => console.log( `Server is running on port ${process.env.PORT}` ) );

export default app;