import express from 'express'
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/dbConfig.js';
import cors from 'cors'
import helmet from 'helmet';
import authRouter from './router/auth.router.js'
import productRouter from './router/product.router.js'
import paymentRouter from './router/payment.router.js'
import orderRouter from './router/order.router.js'
import dotenv from 'dotenv';
dotenv.config()

const app = express();

const PORT = process.env.PORT || 4444

//Connection to Database
connectDB();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/', (req, res) => {
    res.sendFile("./home.html", { root: __dirname })
})

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/payment', paymentRouter);
app.use('/api/v1/order', orderRouter);


app.use((req, res) => {
    res.sendFile("./notfound.html", { root: __dirname })
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: err.message });
});

mongoose.connection.once('open', () => {
    console.log("MongoDB is connected");
    app.listen(PORT, () => {
        console.log(`Server is connected and running in port: ${PORT}`)
    })
})