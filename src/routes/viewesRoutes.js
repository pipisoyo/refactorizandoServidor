import { Router } from 'express';
import { auth, authUser } from '../config/auth.js';
import viewsController from '../controllers/viewsControler.js';

const viewRoutes = Router();

/**
 * Ruta para renderizar la vista de chat.
 * @name GET /chat
 * @function
 */
viewRoutes.get('/chat', viewsController.renderChat);

/**
 * Ruta para renderizar la vista de productos.
 * @name GET /products
 * @function
 */
viewRoutes.get('/products', auth, viewsController.renderProducts);

/**
 * Ruta para renderizar la vista de carrito.
 * @name GET /cart/:cid
 * @function
 */
viewRoutes.get('/cart/:cid', auth, authUser, viewsController.renderCart);

/**
 * Ruta para renderizar la vista de registro.
 * @name GET /register
 * @function
 */
viewRoutes.get('/register', viewsController.renderRegister);

/**
 * Ruta para renderizar la vista de inicio de sesión.
 * @name GET /login
 * @function
 */
viewRoutes.get('/login', viewsController.renderLogin);

/**
 * Ruta para renderizar la vista de perfil.
 * @name GET /
 * @function
 */
viewRoutes.get('/', auth, viewsController.renderProfile);

/**
 * Ruta para renderizar la vista de restablecimiento de contraseña.
 * @name GET /restore
 * @function
 */
viewRoutes.get('/restore', viewsController.renderRestore);

export default viewRoutes;