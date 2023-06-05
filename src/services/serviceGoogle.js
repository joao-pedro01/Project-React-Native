import { Alert } from "react-native";
import axios from 'axios';
import { CHAVE_API_GOOGLE } from '@env';

/* Função para converter coordenadas em cep */
async function getEndereco(Latitude, Longitude) {
    try {
        console.log(Latitude, Longitude)
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${Latitude},${Longitude}&result_type=postal_code&key=${CHAVE_API_GOOGLE}`
        );
        const cep = response.data.results[0].address_components.find(
            (component) => component.types[0] === 'postal_code'
        ).long_name;
        
        return cep;
    } catch (error) {
        console.err(error);

        return null;
    }
}

export default getEndereco;