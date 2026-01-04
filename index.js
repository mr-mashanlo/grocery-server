import 'dotenv/config';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';

const app = express();
app.use( cors( { credentials: true, origin: [ process.env.FRONT_URL ] } ) );
app.use( cookieParser() );
app.use( express.json() );

mongoose.connect( process.env.MONGODB_URL );

app.listen( process.env.PORT, () => console.log( `Server is running on port ${process.env.PORT}` ) );

export default app;