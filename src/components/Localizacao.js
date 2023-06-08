import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import * as Location from 'expo-location';
import getCepApi from '../services/serviceGoogle';
import getEndereco from "../services/serviceViaCep";

export const buscarCep = async (latitude, longitude, status) => {
  try {
    const cep = await getCepApi(latitude, longitude);
    const endereco = await buscarEndereco(cep);
    /* console.log(cep) */
    if(status) {
      return {endereco, cep};
    }
    return {endereco};
  } catch (error) {
    console.log("Erro ao buscar CEP:", error);
  }
};
const buscarEndereco = async (cep) => {
  try {
    const endereco = await getEndereco(cep);

    return endereco;
  } catch (error) {
    console.log("Erro ao buscar endereço:", error);
  }
};
/* const obterLocalizacao = async (latitude, longitude) => {


    if (latitude && longitude) {
      buscarCep();
    }




  data = {
    cep: endereco,
    latitude: latitude,
    longitude: longitude
  }
  return cep
};

export default obterLocalizacao;
 */