import { createHash } from '../utils.js';
import userModel from '../dao/models/users.js';
import response from '../config/responses.js'

const sessionController = {
    logout: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                return response.errorResponse(res, 500, 'Error al cerrar sesión');
            }
            response.successResponse(res, 200, 'Sesión cerrada exitosamente', null);
        });
    },

    register: async (req, res) => {
        response.successResponse(res, 201, 'Usuario registrado exitosamente', null);
    },

    failRegister: async (req, res) => {
        console.log('error');
        response.errorResponse(res, 400, 'Falló el registro');
    },

    login: async (req, res) => {
        if (!req.user) return response.errorResponse(res, 400, 'Error en el inicio de sesión');
        
        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            age: req.user.age,
            role: req.user.role || 'user',
            cartId: req.user.cart
        };
        response.successResponse(res, 200, 'Inicio de sesión exitoso', { user: req.user });
    },

    failLogin: async (req, res) => {
        console.log('error');
        response.errorResponse(res, 400, 'Fallo en el inicio de sesión');
    },

    githubLogin: async (req, res) => {
        response.successResponse(res, 200, 'Autenticación con GitHub iniciada', null);
    },

    githubCallback: async (req, res) => {
        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            age: req.user.age,
            role: req.user.role,
            cartId: req.user.cart
        };
        res.redirect('/products');
    },

    restorePassword: async (req, res) => {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return response.errorResponse(res, 400, 'No se encuentra el usuario');
        }

        const newPass = createHash(password);

        await userModel.updateOne({ _id: user._id }, { $set: { password: newPass } });

        response.successResponse(res, 200, 'Contraseña actualizada correctamente', null);
    },

    getCurrentUser: async (req, res) => {
        if (req.session.user) {
            response.successResponse(res, 200, 'Usuario autenticado', { user: req.session.user });
        } else {
            response.errorResponse(res, 401, 'Usuario no autenticado');
        }
    }
};

export default sessionController;