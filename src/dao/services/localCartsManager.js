// @ts-nocheck
import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Clase que gestiona las operaciones relacionadas con los carritos de compras a nivel local.
 */
export class localCartsManager {
    /**
     * Crea una instancia de localCartsManager.
     */
    constructor() {
        this.carts = [];
        this.idCounter = 0;
        this.PATH = `${__dirname}/dataBase/carts.json`;
    }

    /**
     * Maneja la carga de datos desde el archivo.
     * @returns {Promise<void>} - Resuelve cuando se han manejado los datos.
     * @throws {Error} - Error al cargar los datos.
     */
    async handleData() {
        try {
            let data = await fs.promises.readFile(this.PATH, 'utf-8');

            if (data) {
                this.carts = JSON.parse(data);
                const lastCartId = this.carts.reduce((maxId, cart) => Math.max(maxId, cart.id), 0);
                this.idCounter = lastCartId;
            }
        } catch (error) {
            if (error.code === 'ENOENT') {
                await fs.promises.writeFile(this.PATH, JSON.stringify(''), { encoding: 'utf-8', flag: 'w' });
                this.carts = [];
                return this.carts;
            } else {
                throw new Error("Error al cargar los datos");
            }
        }
    }

    /**
     * Guarda los datos en el archivo.
     * @returns {Promise<void>} - Resuelve cuando se han guardado los datos.
     * @throws {Error} - Error al guardar los datos.
     */
    async saveData() {
        try {
            await fs.promises.writeFile(this.PATH, JSON.stringify(this.carts, null, 2), { encoding: 'utf-8', flag: 'w' });
        } catch (error) {
            throw new Error("Error al guardar los datos");
        }
    }

    /**
     * Crea un nuevo carrito.
     * @returns {Promise<object>} - El carrito creado.
     */
    async createCart() {
        await this.handleData();

        const newCart = {
            id: this.idCounter + 1,
            products: [],
        };

        this.carts.push(newCart);
        this.idCounter++;
        await this.saveData();

        return newCart;
    }

    /**
     * Obtiene un carrito por su ID.
     * @param {number} id - ID del carrito.
     * @returns {Promise<object>} - El carrito encontrado.
     */
    async getCartById(id) {
        await this.handleData();
        const cart = this.carts.find(cart => cart.id == id);
        if (cart) {
            return cart;
        } else {
            return { error: "El carrito no existe", statusCode: 404 };
        }
    }

    /**
     * Agrega un producto a un carrito.
     * @param {number} cartId - ID del carrito.
     * @param {number} productId - ID del producto a agregar.
     * @returns {Promise<object>} - El carrito actualizado.
     * @throws {Error} - Carrito no encontrado.
     */
    async addProductToCart(cartId, productId) {
        await this.handleData();

        const cart = this.carts.find(cart => cart.id == cartId);
        if (!cart) {
            throw new Error("Carrito no encontrado");
        }

        const existingProduct = cart.products.find(product => product.id == productId);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            const newProduct = {
                id: productId,
                quantity: 1,
            };
            cart.products.push(newProduct);
        }

        await this.saveData();

        return cart;
    }
}