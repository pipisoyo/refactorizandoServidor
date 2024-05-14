import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt' 

// Obtiene la ruta del archivo actual
const __filename = fileURLToPath(import.meta.url);
// Obtiene el directorio del archivo actual
const __dirname = dirname(__filename)

/**
 * Exporta la ruta del directorio del archivo actual.
 */
export default __dirname

/**
 * Crea un hash a partir de una contraseña utilizando bcrypt.
 * @param {string} password - Contraseña a hashear.
 * @returns {string} - Hash de la contraseña.
 */
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

/**
 * Valida si una contraseña es válida para un usuario utilizando bcrypt.
 * @param {Object} user - Usuario con la contraseña a validar.
 * @param {string} password - Contraseña a verificar.
 * @returns {boolean} - true si la contraseña es válida, false si no lo es.
 */
export const isValidPassword = (user, password) => {
  console.log(
    `Datos a validar: user-password: ${user.password}, password: ${password}`
  );
  return bcrypt.compareSync(password, user.password);
};