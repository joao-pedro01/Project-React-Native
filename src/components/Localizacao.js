import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import * as Location from 'expo-location';
import getCepApi from '../services/serviceGoogle';
import getEndereco from "../services/serviceViaCep";

const obterLocalizacao = async () => {
  const [endereco, setEndereco] = useState(null);
  const [cep, setCep] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    const getLocationAsync = async () => {
      try {
        const { granted } = await Location.requestForegroundPermissionsAsync();

        if (granted) {
          const location = await Location.getCurrentPositionAsync();
          setLatitude(location.coords.latitude);
          setLongitude(location.coords.longitude);
        } else {
          Alert.alert("Permita o uso de GPS para o app funcionar corretamente!");
        }
      } catch (error) {
        console.log("Erro ao obter localização:", error);
      }
    };

    getLocationAsync();
  }, []);

  useEffect(() => {
    const buscarCep = async () => {
      try {
        const endereco = await getCepApi(latitude, longitude);
        console.log(endereco);
        setEndereco(endereco);
      } catch (error) {
        console.log("Erro ao buscar CEP:", error);
      }
    };

    if (latitude && longitude) {
      buscarCep();
    }
  }, [latitude, longitude]);

  const buscarEndereco = async () => {
    try {
      const endereco = await getEndereco(cep);
      setEndereco(endereco);
      console.log(endereco);
    } catch (error) {
      console.log("Erro ao buscar endereço:", error);
    }
  };

  data = {
    cep: endereco,
    latitude: latitude,
    longitude: longitude
  }
  return cep
};

export default obterLocalizacao;
