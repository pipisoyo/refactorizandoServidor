import productsModel from '../dao/models/products.js';
import cartsModel from '../dao/models/carts.js';
import userModel from '../dao/models/users.js';
import response from '../config/responses.js';

const viewsController = {

//Renderizar Chat
    renderChat: (req, res) => {
        res.render('chat');
    },

    renderProducts: async (req, res) => {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        try {
            const carts = await cartsModel.find({}).lean().exec();
            const users = await userModel.find({}).lean().exec();
            const totalCount = await productsModel.countDocuments({});
            const totalPages = Math.ceil(totalCount / limit);
            const user = req.session.user;
            const role = req.session.user.role;
            const cartId = req.session.user.cartId;

            const results = await productsModel.find({})
                .skip((page - 1) * limit)
                .limit(limit)
                .lean()
                .exec();

            const prevLink = page > 1 ? `?limit=${limit}&page=${page - 1}` : null;
            const nextLink = page < totalPages ? `?limit=${limit}&page=${page + 1}` : null;

            const result = role === "admin";
            
            res.render('products', {
                users,
                user,
                carts,
                products: results,
                prevLink,
                nextLink,
                result,
                cartId
            });
        } catch (error) {
            response.errorResponse(res, 500, "Error al obtener los productos");
        }
    },

//Renderizar Carrito
    renderCart: async (req, res) => {
        const cid = req.params.cid;

        try {
            const cart = await cartsModel.findById(cid).populate('products.product').lean().exec();
            const products = cart.products.map(element => ({
                ...element.product,
                quantity: element.quantity
            }));
            const user = req.session.user;

            res.render('cart', { cart, cid, products, user });
        } catch (error) {
            console.error('Error:', error);
            response.errorResponse(res, 500, "Error en la base de datos");
        }
    },

//Renderizar Registro
    renderRegister: (req, res) => {
        res.render('register');
    },

//Renderizar Login
    renderLogin: (req, res) => {
        res.render('login');
    },

//Renderizar Profile
    renderProfile: (req, res) => {
        res.render('profile', { user: req.session.user });
    },

//Renderizar Restaurar Contraseña
    renderRestore: (req, res) => {
        res.render('restore');
    }
};

export default viewsController;