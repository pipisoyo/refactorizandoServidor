import express from "express"
import productController from "../controllers/productController.js";

const productsRouter = express.Router()

productsRouter.get("/", productController.getAllProducts)
productsRouter.get("/:_id", productController.getProductById)
productsRouter.post("/", productController.addProduct)
productsRouter.post("/insert", productController.insertDocument)
productsRouter.put("/:_id", productController.updateProduct)
productsRouter.delete("/:_id", productController.deleteProduct)

export default productsRouter;
