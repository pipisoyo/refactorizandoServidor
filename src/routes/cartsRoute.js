import express from "express"
import cartControler from "../controllers/cartControler.js";

const cartsRoutes = express.Router()

cartsRoutes.get("/:cid", cartControler.getCartbyId)
cartsRoutes.post("/", cartControler.createCart)
cartsRoutes.post("/:cid/product/:pid/",cartControler.addProuctToCart)
cartsRoutes.delete('/:cid/products/:pid', cartControler.deleteProductToCart)
cartsRoutes.put('/:cid', cartControler.updateCart)
cartsRoutes.put('/:cid/products/:pid', cartControler.updateQuantity);
cartsRoutes.delete('/:cid', cartControler.clearCart)

export default cartsRoutes;