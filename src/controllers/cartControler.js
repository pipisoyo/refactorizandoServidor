import CartsManager from "../dao/services/cartManager.js";
import response from "../middeleweres/responses.js";

const cartsManager = new CartsManager();

const cartControler = {

//Recuperar Carrito
    getCartbyId : async (req, res) => {

        const cid = req.params.cid;
      
        try {
          const cart = await cartsManager.getCartById(cid);
          response.successResponse(res, 200 , "Carrito recuperado exitosamente", cart)
        } catch (error) {
          console.error('Error:', error);
          response.errorResponse(res, 500 , "Error al recuperar el Carrito")
        }
    },
    
//Crear Carrito
    createCart : async (req, res) => {

        try {
          const newCart = await cartsManager.createCart();
          response.successResponse(res, 201 , "Carrito creado exitosamente", newCart)
        } catch (error) {
          console.error("Error al crear el carrito:", error);
          response.errorResponse(res, 500 , "Error al crear el Carrito")
        }
    },

//Agregar producto al carrito
    addProuctToCart : async (req, res) => {

        const pid = req.params.pid
        const cid = req.params.cid
        const quantity = 1;
      
        try {
          const cart = await cartsManager.getCartById(cid);
          if (!cart || cart.length === 0) {
            cart = await cartsManager.createCart()
          }
          await cartsManager.addProduct(cid, pid, quantity);
          response.successResponse(res, 201 , "Producto agregado al carrito")
        } catch (error) {
          console.error("Error al intentar agregar el producto al carrito", error);
          response.errorResponse(res, 500 , "Error al intentar agregar el producto al Carrito")
        }
      },

//Eliminar producto del carrito
    deleteProductToCart : async (req, res) => {

        const cid = req.params.cid;
        const pid = req.params.pid;
      
        try {
          await cartsManager.deleteProduct(cid, pid);
          response.successResponse(res, 200 , "Producto eliminado del carrito")
        } catch (error) {
          console.error("Error al intentar eliminar el producto del carrito", error);
          response.errorResponse(res, 500 , "Error al intentar eliminar el producto del carrito")
        }
      },

//Actualizar carrito
    updateCart :async (req, res) => {

        const cid = req.params.cid;
        const products = req.body.products;
      
        try {
          await cartsManager.updateCart(cid, products);
          response.successResponse(res, 200 , "Carrito actualizado")
        } catch (error) {
          console.error("Error al intentar actualizar el carrito", error);
          response.errorResponse(res, 500 , "Error al intentar actualizar el carrito")
        }
    },

//Actualizar catidad del producto
    updateQuantity : async (req, res) => {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const quantity = req.body.quantity;
      
        try {
          await cartsManager.updateQuantity(cid, pid, quantity);
          response.successResponse(res, 200 , "Cantidad de producto actualizada")
        } catch (error) {
          console.error("Error al intentar actualizar la cantidad del producto", error);
          response.errorResponse(res, 500 , "Error al intentar actualizar la cantidad del producto")
        }
      },

//Vaciar carrito
    clearCart : async (req, res) => {
        const cid = req.params.cid;
        const products = [];
        try {
          await cartsManager.updateCart(cid, products);
          response.successResponse(res, 200 , "Todos los productos eliminados del carrito")
        } catch {
          console.error("Error al intentar eliminar los productos del carrito", error);
          response.errorResponse(res, 500 , "Error al intentar eliminar los productos del carrito")
        }
      },


}    

export default cartControler;