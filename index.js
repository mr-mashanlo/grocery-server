import 'dotenv/config';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';

import { addressRouter } from './routers/address-router.js';
import { authRouter } from './routers/auth-router.js';
import { categoryRouter } from './routers/category-router.js';
import { orderRouter } from './routers/order-router.js';
import { productRouter } from './routers/product-router.js';
import { errorHandler } from './shared/error-handler.js';

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