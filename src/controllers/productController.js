import ProductManager from "../dao/services/productManager.js";
import { io } from '../config/server.js'
import responses from "../config/responses.js";

const productManager = new ProductManager();

const productController = {

//Recuperar todos los productos    
    getAllProducts: async (req, res) => {
        try {
            let { limit = 10, page = 1, sort = "", query = "", availability = "" } = req.query;
            limit = parseInt(limit);
            page = parseInt(page);
    
            const filter = {};
            const sortOption = {};
    
            // Filtro por categoría
            if (query) {
                filter.category = query;
            }
    
            // Filtro por disponibilidad
            if (availability) {
                filter.status = availability === "available";
            }
    
            // Ordenamiento por precio
            if (sort === "desc") {
                sortOption.price = -1;
            } else if (sort === "asc") {
                sortOption.price = 1;
            } else {
                sortOption._id = 1;
            }
    
            const skip = (page - 1) * limit;
            const result = await productManager.getAll(limit, skip, sortOption, filter);
    
           responses.successResponse(res, 200, "Productos recuperados exitosamente", result);
        } catch (error) {
            console.error("Error al obtener los productos:", error);
            responses.errorResponse(res, 500, "Error al obtener los productos");
        }
    },

//Recuperar producto por id
    getProductById: async (req, res) => {

        try {
            let id = req.params._id;
            let data = await productManager.getById(id);
            responses.successResponse(res, 200, "Producto recuperado exitosamente", data);
        } catch (error) {
            console.error("Error al obtener el producto:", error);
            responses.errorResponse(res, 500, "Error al obtener el producto");
        }
    },

//Agregar un producto
    addProduct: async (req, res) => {

        try {
            const newProduct = req.body;
            let result = await productManager.addProduct(newProduct);
            res.json({ result });
            let data = await productManager.getAll();
            responses.successResponse(res, 201, "Producto agregado exitosamente", result);
            io.emit('products', data);
        } catch (error) {
            console.error("Error al agregar el producto:", error);
            responses.errorResponse(res, 500, "Error al agregar el producto");
        }
    },

//Insertar un documento
    insertDocument: async (req, res) => {

        try {
            const product = req.body;
            let result = await productManager.addProducts(product);
            res.json({ result });
            let data = await productManager.getAll();
            responses.successResponse(res, 201, "Documentos insertados exitosamente", result);
            io.emit('products', data);
        } catch (error) {
            console.error("Error al insertar el documento:", error);
            responses.errorResponse(res, 500, "Error al instertar el documento");
        }
    },
    
//Actualuzar un producto
    updateProduct: async (req, res) => {

        try {
            const product = req.body;
            let result = await productManager.addProducts(product);
            res.json({ result });
            let data = await productManager.getAll();
            responses.successResponse(res, 200, "Producto actualizado exitosamente", result);
            io.emit('products', data);
        } catch (error) {
            console.error("Error al insertar el documento:", error);
            responses.errorResponse(res, 500, "Error al instertar el documento");
        }
    },
    
//Eliminar un producto
    deleteProduct: async (req, res) => {

        try {
            let id = req.params._id;
            let result = await productManager.delateProduct(id);
            res.json({ result });
            let data = await productManager.getAll()
            responses.successResponse(res, 200, "Producto eliminado exitosamente", result);
            io.emit('products', data);
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
            responses.errorResponse(res, 500, "Error al eliminar el producto");
        }
    }
};

export default productController;