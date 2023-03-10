import express from 'express';
const router = express.Router();

// Controllers
// import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/products.controllers.js';
import { getProducts,  deleteProduct, createProduct, getProductById, updateProduct} from '../controllers/products.controllers.js';

router.get('/', getProducts);
router.get ('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);



export default router;

