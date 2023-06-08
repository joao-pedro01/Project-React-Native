import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import axios from 'axios';
import { style } from './styles/Title';

const FormularioDesativado = ({navigation, route}) => {
    
    const [status, setStatus] = useState(false);
    const [usuario, setUsuario] = useState(route.params.usuario);
    const [nome, setNome] = useState(usuario.nome)
    const [email, setEmail] = useState(usuario.email)
    const data = route.params.usuario;
    console.log(data)
    const handlePress = () => {
        setStatus(true);
    };
    const update = () => {
        axios.put(`http://192.168.56.1:3000/usuarios/${usuario._id}`, {nome: nome, email: email}).then((res) => {
            Alert.alert(`Usuario ${res.data.nome} alterado com sucesso`);
            console.log(res)
            navigation.navigate('ListarUsuarios');
        }).catch((error) => {
            Alert.alert('Erro', `Erro ao efetuar atualizar: ${error.message}`);
        })
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Editar Usuário</Text>
            <TextInput
                style={styles.input}
                placeholder="Nome"
                onChangeText={text => setNome(text)}
                defaultValue={usuario.nome}
                editable={status}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={text => setEmail(text)}
                defaultValue={usuario.email}
                editable={status}
            />
            <Button mode="contained" onPress={handlePress} style={styles.button}>
                Editar
            </Button>
            <Button mode="contained" onPress={update} style={styles.button}>
                Atualizar
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 10,
        marginBottom: 12,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    button: {
        width: '100%',
        height: 40,
        borderRadius: 4,
        marginBottom: 12,
    }
});

export default FormularioDesativado;
