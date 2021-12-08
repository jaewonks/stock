import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
//import orderRouter from './routers/orderRouter.js';

dotenv.config();
export const db = mysql.createConnection({
    host : 'localhost',
    user: 'root',
    password: process.env.MYSQL_PASSWORD,
    database: 'stock'
  });
  
  db.connect((err) => {
    if (err) throw err;
    console.log('DB Connected!');
  });

const app = express();
// make connection between frontend and backend using sesstions and cookies
app.use(cors());
app.use(bodyParser.json());

app.use(express.static('public'));
app.use('/images/stock',express.static('uploads'));

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
//app.use('/api/orders', orderRouter);

app.listen(process.env.PORT, () => {console.log(`Listening on http://localhost:${process.env.PORT}`)});