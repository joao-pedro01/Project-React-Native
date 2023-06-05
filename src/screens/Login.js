import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import axios from 'axios';

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [EfetuandoLogin, setEfetuandoLogin] = useState(false);
    const [showCadastro, setShowCadastro] = useState(false);


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
        var nome = "joao", tipoUsuario = 1;
        
        //axios.post('http://192.168.56.1:3000/usuarios', {email: email, senha: senha, tipoUsuario: tipoUsuario, nome: nome}).then((res) => {
        axios.get('http://192.168.56.1:3000/usuarios').then((res) => {
            console.log(res.data);
            navigation.navigate('ListarUsuarios');
        }).catch((error) => {
            Alert.alert('Erro', `Erro ao efetuar o login: ${error.message}`);
        })
        setEfetuandoLogin(false)
    }

    const handleSignUp = () => {
        navigation.navigate('Cadastro'); // Redireciona para a página de cadastro
    };

    return (
        <View style={{ padding: 16 }}>
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