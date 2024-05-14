import express from "express";
import productController from "../controllers/productController.js";

const productsRouter = express.Router();

/**
 * Ruta para obtener todos los productos.
 * @name GET /products
 * @function
 */
productsRouter.get("/", productController.getAllProducts);

/**
 * Ruta para obtener un producto por su ID.
 * @name GET /products/:_id
 * @function
 */
productsRouter.get("/:_id", productController.getProductById);

/**
 * Ruta para agregar un nuevo producto.
 * @name POST /products
 * @function
 */
productsRouter.post("/", productController.addProduct);

/**
 * Ruta para insertar un documento.
 * @name POST /products/insert
 * @function
 */
productsRouter.post("/insert", productController.insertDocument);

/**
 * Ruta para actualizar un producto por su ID.
 * @name PUT /products/:_id
 * @function
 */
productsRouter.put("/:_id", productController.updateProduct);

/**
 * Ruta para eliminar un producto por su ID.
 * @name DELETE /products/:_id
 * @function
 */
productsRouter.delete("/:_id", productController.deleteProduct);

export default productsRouter;