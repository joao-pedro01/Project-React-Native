import React, { useState, useEffect } from 'react';
import { View, Alert } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import axios from 'axios';
import * as Location from 'expo-location';
import obterLocalizacao from '../components/Localizacao';

const CadastroScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [EfetuandoCadastro, setEfetuandoCadastro] = useState(false);
    const [showCadastro, setShowCadastro] = useState(false);
    const [ipAddress, setIpAddress] = useState('');
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    useEffect(() => {
        <obterLocalizacao />
        const obterIP = async () => {
            try {
                const response = await fetch('https://api.ipify.org/?format=json');
                const data = await response.json();
                setIpAddress(data.ip);
            } catch (error) {
                console.log('Erro ao obter o endereço IP:', error);
            }
        };

        const getLocationAsync = async () => {
            try {
                const { granted } = await Location.requestForegroundPermissionsAsync();
        
                if (granted) {
                    const location = await Location.getCurrentPositionAsync();
                    setLatitude(location.coords.latitude);
                    setLongitude(location.coords.longitude);
                    console.log(longitude);
                } else {
                    Alert.alert("Permita o uso de GPS para o app funcionar corretamente!");
                }
            } catch (error) {
                console.log("Erro ao obter localização:", error);
            }
        };
    
        getLocationAsync();
        obterIP();
    }, []);

    function validarCadastro() {
        //Efetuando as validações básicas do form
        if(email === '' || senha ==='' || nome ===''){
            Alert.alert('Atenção⚠',
            'Informe seu nome, email e senha para efetuar o Cadastro');
            return;
        }
        if(senha.length < 6){
            Alert.alert('Atenção⚠', 'A senha deve ter no mínimo 6 caracteres');
            return;
        }
        setEfetuandoCadastro(true);

        data = {
            nome: nome,
            email: email,
            senha: senha,
            ip: ipAddress,
            tipoUsuario: 1
        }
        axios.post('http://192.168.56.1:3000/usuarios', data).then((res) => {
            console.log(res.data);
            navigation.navigate('Login');
            try {
                const endereco = obterLocalizacao(latitude, longitude);
                console.log(endereco);
            } catch (error) {
                console.log('Erro ao obter o endereço:', error);
            }
        }).catch((error) => {
            Alert.alert('Erro', `Erro ao efetuar o Cadastro: ${error.message}`);
            setEfetuandoCadastro(false)
        })
    }

    const handleLogin = () => {
        navigation.navigate('Login'); // Redireciona para a página de cadastro
    };

    return (
        <View style={{marginTop: 150, padding: 16 }}>
            <TextInput
                label="Nome"
                value={nome}
                required
                onChangeText={text => setNome(text)}
                style={{ marginBottom: 16 }}
            />
            <TextInput
                label="E-mail"
                value={email}
                onChangeText={text => setEmail(text)}
                style={{ marginBottom: 16 }}
            />
            <TextInput
                label="Senha"
                value={senha}
                onChangeText={text => setSenha(text)}
                secureTextEntry
                style={{ marginBottom: 16 }}
            />
            <Button mode="contained" onPress={validarCadastro}>
                Cadastro
            </Button>
            <Text style={{ marginTop: 16, textAlign: 'center' }}>
                Já tem uma conta?{' '}
                <Text
                style={{ color: 'blue', textDecorationLine: 'underline' }}
                onPress={handleLogin}
                >
                Cadastre-se
                </Text>
            </Text>
        </View>
    );
};

export default CadastroScreen;