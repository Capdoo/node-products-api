import express from 'express';
import morgan from 'morgan';
import pkg from '../package.json';

//to get libs
import {createRoles} from "./libs/initSetup";

import productsRoutes from "./routes/products.routes";
import authRoutes from "./routes/auth.routes";


const app = express();
createRoles();


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
app.use('/api/products', productsRoutes);
app.use('/api/auth', authRoutes);







export default app;

