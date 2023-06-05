import axios, { AxiosError, isAxiosError } from 'axios';
import { Alert } from 'react-native';

/* Função para converter cep em endereço */
const getEndereco = async(cep) => {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    const endereco = response.data;
    return endereco;
  } catch (error) {
    console.error(error);
    Alert.alert('Alerta', 'Cep não encontrado na base de dados');
    return null;
  }
}

export default getEndereco;