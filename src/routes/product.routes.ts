import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { getAllProduct , getSomeProduct , createProduct ,updateProduct, deleteProduct} from '../controllers/product.controller.js';

const router = Router();

router.get('/',authMiddleware,getAllProduct)
router.get('/:id',authMiddleware,getSomeProduct)
router.patch('/',authMiddleware,updateProduct)
router.delete('/',authMiddleware,deleteProduct)


export default router;