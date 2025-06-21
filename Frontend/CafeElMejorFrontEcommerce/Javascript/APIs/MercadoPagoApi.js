// TODO: Cuando tengas tu backend, reemplaza esta URL por la correcta.
const API_BASE = "https://localhost:7069/api/MercadoPago/crear-preferencia";

export async function CrearPreferencia(preferencia){
    try {
        //axios.post(URL, DATOS_A_ENVIAR)
        const response = await axios.post(API_BASE, preferencia);
        return response.data;
    } catch (error) {
        console.error("Error al crear preferencia:", error.response?.data || error);
        throw error;
    }

}

