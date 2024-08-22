import express from 'express';
import homeRouter from './routes/homeRoute.js';
import {aboutusRouter} from './routes/aboutusRouter.js';
import {productRouter} from './routes/productRouter.js';
import usersRouter from './routes/UserRouter.js';


const app= express();
const port = 5000;
app.use(express.json());

app.use('/aboutus',aboutusRouter)
app.use('/products',productRouter)
app.use('/user',usersRouter)

app.use('/',homeRouter)
// app.get('/', (req,res) => res.send("Hello World"));
app.listen(port, () => console.log(`Listening at port number ${port}`))