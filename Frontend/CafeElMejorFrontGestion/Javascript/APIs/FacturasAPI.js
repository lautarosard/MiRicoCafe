/**
 * Este archivo se encarga de todas las interacciones (peticiones HTTP)
 * con el endpoint de la API de Facturas.
 * Se utiliza axios para realizar las llamadas.
 */
import axios from "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js";

// TODO: Cuando tengas tu backend, reemplaza esta URL por la correcta.
const API_BASE = "https://localhost:7069/api/Factura"; 

/**
 * Obtiene todas las facturas desde el backend.
 * @returns {Promise<Array>} Una promesa que resuelve a un array de facturas.
 */
export async function GetAllFacturas() {
    try {
        const response = await axios.get(API_BASE);
        // Si la respuesta es exitosa pero no devuelve un array, devolvemos uno vacío para evitar errores.
        if (response.data && Array.isArray(response.data)) {
            return response.data;
        } else {
            console.warn('La respuesta de la API no contenía un array de facturas:', response);
            return [];
        }
    } catch (error) {
        console.error('Error al obtener las facturas:', error);
        // En caso de error, devolvemos un array vacío para que la UI no se rompa.
        return []; 
    }
}

/**
 * Obtiene una única factura por su número o ID.
 * @param {string} numero El número o ID de la factura a obtener.
 * @returns {Promise<object>} Una promesa que resuelve al objeto de la factura.
 */
export async function GetFacturaByNumero(numero) {
    try {
        const response = await axios.get(`${API_BASE}/${numero}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener la factura ${numero}:`, error);
        throw error; // Lanzamos el error para que el handler pueda capturarlo.
    }
}

/**
 * Envía una nueva factura al backend para ser creada.
 * @param {object} nuevaFactura El objeto de la factura a registrar.
 * @returns {Promise<object>} Una promesa que resuelve a la factura creada.
 */
export async function CreateFactura(nuevaFactura) {
    try {
        const response = await axios.post(API_BASE, nuevaFactura);
        return response.data;
    } catch (error) {
        console.error("Error al crear la factura:", error.response?.data || error);
        throw error; // Lanzamos el error para que el handler lo maneje.
    }
}
