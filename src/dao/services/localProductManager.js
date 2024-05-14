import fs from 'fs';
import __dirname from '../../utils.js';

/**
 * Clase que gestiona la manipulación de productos almacenados localmente en un archivo JSON.
 */
export class localProductManager {
    /**
     * Constructor de la clase localProductManager.
     */
    constructor() {
        /**
         * @type {Array<object>} 
         */
        this.products = [];
        /**
         * @type {number} 
         */
        this.idCounter = 0;
        /**
         * @type {string}
         */
        this.PATH = `${__dirname}/dataBase/products.json`;
    }

    /**
     * Carga los datos de productos desde el archivo JSON.
     * @returns {Promise<void>} 
     */
    async handleData() {
        try {
            let data = await fs.promises.readFile(this.PATH, 'utf-8');

            if (data) {
                this.products = JSON.parse(data);
                const lastProductId = this.products.reduce((maxId, product) => Math.max(maxId, product.id), 0);
                this.idCounter = lastProductId;
            }
        } catch (error) {
            if (error.code === 'ENOENT') {
                await fs.promises.writeFile(this.PATH, JSON.stringify(''), null, 2);
                this.products = [];
                return this.products;
            } else {
                throw new Error("Error al cargar los datos");
            }
        }
    }

    /**
     * Guarda los datos de productos en el archivo JSON.
     * @returns {Promise<void>} 
     */
    async saveData() {
        try {
            await fs.promises.writeFile(this.PATH, JSON.stringify(this.products), null, 2);
        } catch (error) {
            throw new Error("Error al guardar los datos");
        }
    }

    /**
     * Agrega un nuevo producto a la lista de productos.
     * @param {object} productData - Datos del nuevo producto a agregar.
     * @returns {Promise<void>} - Promesa que maneja la adición del producto.
     */
    async addProduct(productData) {
        await this.handleData();

        if (!this.products.some(product => product.code === productData.code)) {
            const newProduct = {
                id: this.idCounter + 1,
                title: productData.title,
                description: productData.description,
                price: productData.price,
                thumbnail: productData.thumbnail,
                code: productData.code,
                stock: productData.stock,
            };
            this.products.push(newProduct);
            this.idCounter++;
            await this.saveData();
        } else {
            throw new Error("Error al agregar el producto");
        }
    }

    /**
     * Obtiene todos los productos.
     * @returns {Promise<Array<object>>} - Lista de productos.
     */
    async getProducts() {
        await this.handleData();
        return this.products;
    }

    /**
     * Obtiene un producto por su ID.
     * @param {number} id - ID del producto a buscar.
     * @returns {Promise<object>} - Producto encontrado.
     */
    async getProductById(id) {
        await this.handleData();
        const product = this.products.find(product => product.id == id);
        if (product) {
            return product;
        } else {
            throw new Error("El producto no existe");
        }
    }

    /**
     * Actualiza un producto por su ID con nuevos datos.
     * @param {number} id - ID del producto a actualizar.
     * @param {object} newProductData - Nuevos datos del producto.
     * @returns {Promise<boolean>} - Indicador de éxito de la actualización.
     */
    async updateProduct(id, newProductData) {
        await this.handleData();

        const product = this.products.find(product => product.id == id);
        if (product) {
            if (newProductData.hasOwnProperty('id')) {
                throw new Error("No se permite modificar el ID del producto.");
            }

            const updatedProduct = {
                ...product,
                ...newProductData
            };
            const index = this.products.indexOf(product);
            this.products[index] = updatedProduct;
            this.saveData();
            return true;
        } else {
            return false;
        }
    }

    /**
     * Elimina un producto por su ID.
     * @param {number} id - ID del producto a eliminar.
     * @returns {Promise<object|null>} - Producto eliminado o nulo si no se encuentra.
     */
    async deleteProduct(id) {
        await this.handleData();
        const productIndex = this.products.findIndex(product => product.id == id);
        if (productIndex === -1) {
            return null;
        }

        const deletedProduct = this.products.splice(productIndex, 1)[0];
        await this.saveData();

        return deletedProduct;
    }
}


