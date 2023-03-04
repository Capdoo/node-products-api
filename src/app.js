import express from 'express';
import morgan from 'morgan';
import pkg from '../package.json';

import productsRoutes from "./routes/products.routes";


const app = express();

//To use package.json
app.set('pkg', pkg);
//To understand json traffic
app.use(express.json())
//To catch traffic in routes
app.use(morgan('dev'));

app.get('/', (req, res) =>{
    res.json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version,
    });
    console.log('welcome');
})

//To use my routes
app.use('/products', productsRoutes)








export default app;

