import React, { useState, useEffect } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { RadioButton, TextInput, Button, Text } from 'react-native-paper';
import axios from 'axios';
import { URL_API } from '@env';
import * as Location from 'expo-location';
import { buscarCep } from '../components/Localizacao';
import { styles } from './styles/Title'

const CadastroScreen = ({navigation, route}) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [efetuandoCadastro, setEfetuandoCadastro] = useState(false);
    const [showCadastro, setShowCadastro] = useState(false);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [value, setValue] = useState('um');
    const [dados, setDados] = useState({});
    const [status, setStatus] = useState(false);
    const [cep, setCep] = useState('');
    
    const handleRadioChange = (value) => {
        setStatus(value);
    };
    const handlePress = (newValue) => {
        setValue(newValue);
    };
    

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

        var dados = {
            nome: nome,
            email: email,
            senha: senha,
            ip: route.params.dados.ipAddress,
            tipoUsuario: 1
        };
        
        //console.log(dados)
        axios.post('http://192.168.56.1:3000/usuarios/busca', {'email': dados.email, 'senha': dados.senha}).then((res) => {
            console.log('Quantidade de dados:', res.data.length); // Exibe a quantidade de dados retornados
            
            /*             } else {
                Alert.alert('Erro', "Email já cadastrado!")
                return;
            } */
            
            if(res.data.length > 0) {
                Alert.alert('Erro', "Email já cadastrado!");
                return;
            }
            axios.post('http://192.168.56.1:3000/usuarios', dados).then((res) => {
                
                let latitude = route.params.dados.latitude;
                let longitude = route.params.dados.longitude;
                
                async function consultaCep(latitude, longitude) {
                    if(status) {
                        buscarCep(latitude, longitude, status).then((endereco) => {
                            let cep = endereco.cep;
                            setCep(cep);
                            return;
                        }).catch ((error) => {
                            Alert.alert('Erro ao obter o endereço:', error);
                        });
                    }
                    setCep('');
                }
                consultaCep(latitude, longitude);
                
                let dadosLocalizacao = {
                    usuario: res.data._id,
                    latitude: latitude,
                    longitude: longitude,
                    cep: cep
                }
                console.log(dadosLocalizacao)
                axios.post(`http://192.168.56.1:3000/localizacoes`, dadosLocalizacao).then((res) => {
                    console.log(res.data);
                }).catch((error) => {
                    Alert.alert('Erro', `Erro ao registrar a localização: ${error.message}`);
                    setEfetuandoCadastro(false)
                })
            }).catch((error) => {
                Alert.alert('Erro', `Erro ao efetuar o Cadastro: ${error.message}`);
                setEfetuandoCadastro(false)
            });
            navigation.navigate('Login');
        }).catch((error) => {
            Alert.alert('Erro', `Erro ao efetuar o Cadastro: ${error.message}`);
            setEfetuandoCadastro(false)
        });
    }

    const handleLogin = () => {
        navigation.navigate('Login'); // Redireciona para a página de login
    }

    return (
        <View style={{marginTop: 100, padding: 16 }}>
            <View style={styles.container}> 
                <Text style={styles.title}>Cadastre-se</Text>
            </View>
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
            
            <Text>
                Está em território nacional?
            </Text>
            <RadioButton.Group>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton 
                        value="true"
                        status={status === true ? 'checked' : 'unchecked'}
                        onPress={() => handleRadioChange(true)}
                    />
                    <Text>Sim</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton
                        value="false"
                        status={status === false ? 'checked' : 'unchecked'}
                        onPress={() => handleRadioChange(false)}
                    />
                    <Text>Não</Text>
                </View>
            </RadioButton.Group>
            <Button mode="contained" onPress={validarCadastro}>
                Cadastro
            </Button>
            <Text style={{ marginTop: 16, textAlign: 'center' }}>
                Já tem uma conta?{' '}
                <Text
                style={{ color: 'blue', textDecorationLine: 'underline' }}
                onPress={handleLogin}
                >
                Login
                </Text>
            </Text>
        </View>
    );
};

export default CadastroScreen;