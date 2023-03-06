import { Router } from 'express';
const router = Router();

import * as productsController from "../controllers/products.controller";

//middleware
import {authJwt} from "../middlewares/index";

//read all
router.get('/', productsController.readAllProducts);
//crud
router.post('/', [authJwt.verifyToken, authJwt.isAdmin], productsController.createProduct);
router.get('/:productId', productsController.readProduct);
router.put('/:productId', [authJwt.verifyToken, authJwt.isAdmin], productsController.updateProduct);
router.delete('/:productId', [authJwt.verifyToken, authJwt.isAdmin], productsController.deleteProduct   );






export default router;