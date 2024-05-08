import { Router } from 'express';
import { auth , authUser} from '../middeleweres/auth.js';
import viewsController from '../controllers/viewsControler.js';

const viewRoutes = Router();

viewRoutes.get('/chat', viewsController.renderChat);
viewRoutes.get('/products', auth, viewsController.renderProducts);
viewRoutes.get('/cart/:cid', auth, authUser, viewsController.renderCart);
viewRoutes.get('/register', viewsController.renderRegister);
viewRoutes.get('/login', viewsController.renderLogin);
viewRoutes.get('/', auth, viewsController.renderProfile);
viewRoutes.get('/restore', viewsController.renderRestore);

export default viewRoutes;