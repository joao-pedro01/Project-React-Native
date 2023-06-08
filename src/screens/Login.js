import React, { useState, useEffect } from 'react';
import { View, Alert } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import axios from 'axios';
import * as Location from 'expo-location';
import { buscarCep } from '../components/Localizacao';
import { styles } from './styles/Title';

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [dados, setDados] = useState({});
    const [ipAddress, setIpAddress] = useState('');
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [EfetuandoLogin, setEfetuandoLogin] = useState(false);
    const [showCadastro, setShowCadastro] = useState(false);

    useEffect(() => {
        const obterIP = async () => {
            try {
                const response = await fetch('https://api.ipify.org/?format=json');
                const data = await response.json();
                setIpAddress(data.ip);
                console.log('Endereço IP:', ipAddress);
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
                } else {
                    Alert.alert("Permita o uso de GPS para o app funcionar corretamente!");
                }
            } catch (error) {
                console.log("Erro ao obter localização:", error);
            }
        };
    
        getLocationAsync();
        obterIP();
        setDados({
            ipAddress: ipAddress,
            latitude: latitude,
            longitude: longitude
        });
    }, [latitude, longitude, ipAddress]);

    function validarLogin() {
        //Efetuando as validações básicas do form
        if(email === '' || senha ===''){
            Alert.alert('Atenção⚠',
            'Informe um email e senha para efetuar o login');
            return;
        }
        if(senha.length < 6){
            Alert.alert('Atenção⚠', 'A senha deve ter no mínimo 6 caracteres');
            return;
        }
        setEfetuandoLogin(true);
        var user = {
            email: email,
            senha: senha
        };
        //axios.post('http://192.168.56.1:3000/usuarios', {email: email, senha: senha, tipoUsuario: tipoUsuario, nome: nome}).then((res) => {
        axios.post('http://192.168.56.1:3000/usuarios/busca', {email: user.email, senha: user.senha}).then((res) => {
            console.log('Quantidade de dados:', res.data.length); // Exibe a quantidade de dados retornados
            
            if(res.data.length > 0) {
                buscarCep(latitude, longitude).then((endereco) => {
                    let query = {
                        usuario: res.data[0]._id,
                        latitude: latitude,
                        longitude: longitude,
                        cep: endereco.cep
                    }

                    axios.post(`http://192.168.56.1:3000/localizacoes`, query).then((res) => {
                        console.log(res.data);
                        navigation.navigate('ListarUsuarios');
                    }).catch((error) => {
                        Alert.alert('Erro', `Erro ao efetuar o Cadastro: ${error.message}`);
                        setEfetuandoCadastro(false)
                    })
                    
                    //navigation.navigate('Login');
                }).catch ((error) => {
                    Alert.alert('Erro ao obter o endereço:', error);
                }) 
            } else {
                Alert.alert('Erro', "Usuario ou senha inválida!")
            }
        }).catch((error) => {
            Alert.alert('Erro', `Erro ao efetuar o login: ${error.message}`);
        })
        setEfetuandoLogin(false)
    }

    const handleSignUp = () => {
        console.log(dados)
        navigation.navigate('Cadastro', {dados: dados}); // Redireciona para a página de cadastro
    };

    return (
        <View style={{ padding: 16, marginTop: 140 }}>
            <View style={styles.container}> 
                <Text style={styles.title}>Login</Text>
            </View>
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
            <Button mode="contained" onPress={validarLogin}>
                Login
            </Button>
            <Text style={{ marginTop: 16, textAlign: 'center' }}>
                Não tem uma conta?{' '}
                <Text
                style={{ color: 'blue', textDecorationLine: 'underline' }}
                onPress={handleSignUp}
                >
                Cadastre-se
                </Text>
            </Text>
        </View>
    );
};

export default LoginScreen;