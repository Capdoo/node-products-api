import { Router } from 'express';
const router = Router();

import * as productsController from "../controllers/products.controller";

//read all
router.get('/', productsController.readAllProducts);
//crud
router.post('/', productsController.createProduct);
router.get('/:productId', productsController.readProduct);
router.put('/:productId', productsController.updateProduct);
router.delete('/:productId', productsController.deleteProduct   );






export default router;