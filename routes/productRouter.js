
import express from "express";
import { getProducts ,getProductsByCategory,getProductsById,getProductsByPriceRange,createProduct,updateProductStarrating,deleteProductById} from "../controllers/productsController.js";
import {authenticateToken} from "../middlewares/authMiddleware.js"

const productRouter = express.Router()
productRouter.get('/',getProducts)
productRouter.get('/:id',getProductsById)
productRouter.get('/category/:category',getProductsByCategory)
productRouter.get('/price/:minPrice/:maxPrice',getProductsByPriceRange)
productRouter.post('/createProduct',createProduct)
productRouter.put('/updateProduct/:id',updateProductStarrating)

productRouter.delete('/deleteProduct/:id',authenticateToken,deleteProductById)




export {productRouter};

//prodct to retrive data

