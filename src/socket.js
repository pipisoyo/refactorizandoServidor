import { io } from './config/server.js';
import messagesModel from "./dao/models/messagess.js";
import ProductManager from "./dao/services/productManager.js";

const productManager = new ProductManager();
const msg = [];

/**
 * Inicializa el socket para la comunicación en tiempo real.
 */
const initSocket = () => {
  io.on('connection', socket => {

    console.log("Cliente realTimeProducts Conectado!");
    socket.on('realTimeProducts', async () => {
      try {
        const products = await productManager.getAll()
        socket.emit('productos', products);
      } catch (error) {
        console.error('Error al obtener la lista de productos:', error);
      }
    });
    
    console.log("Mensajería conectada");

    /**
     * Maneja el evento de recepción de mensajes.
     * @param {Object} data - Datos del mensaje recibido.
     */
    socket.on('message', async (data) => {
      const message = new messagesModel({
        email: data.user,
        message: data.message,
      });

      try {
        await message.save();
        console.log('Mensaje guardado correctamente');
      } catch (error) {
        console.error('Error al guardar el mensaje:', error);
      }

      msg.push(data);
      io.emit('messageLogs', msg);
    });

  });
}

export default initSocket;