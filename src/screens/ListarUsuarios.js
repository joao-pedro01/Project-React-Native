import { ListItem, Icon, Button } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert, View, Text } from 'react-native';
import { styles } from './styles/Title';

const ListarUsuarios = ({ navigation }) => {
const [usuarios, setUsuarios] = useState([]);

useEffect(() => {
    function getUsuarios() {
        axios.get('http://192.168.56.1:3000/usuarios')
        .then((res) => {
            setUsuarios(res.data);
        })
        .catch((error) => {
            Alert.alert('Erro', `Erro ao efetuar o login: ${error.message}`);
        });
    }
    getUsuarios();
}, []);

function deleteUsuario(id) {
    console.log(id);
    axios.delete(`http://192.168.56.1:3000/usuarios/${id}`).then((res) => {
        Alert.alert('Sucesso', `${res.data.message}`);
        refreshPage();
    }).catch((error) => {
        Alert.alert('Erro', `Erro ao efetuar o login: ${error.message}`);
    });
}
function refreshPage() {
    navigation.replace('ListarUsuarios'); // Navega para a mesma tela novamente
}

return (
    <>
    <View style={styles.container}>
        <View style={{marginTop: 45}}>
            <Text style={styles.title}>Usuários cadastrados</Text>
        </View>
    </View>
    {usuarios.map((usuario, index) => (
        <ListItem.Swipeable
        key={index}
        leftContent={(reset) => (
            <Button
            title="Info"
            onPress={() => navigation.navigate('InfoUsuario', {usuario:usuario} )}
            icon={{ name: 'info', color: 'white' }}
            buttonStyle={{ minHeight: '100%' }}
            />
        )}
        rightContent={(reset) => (
            <Button
            title="Deletar"
            onPress={() => deleteUsuario(usuario._id)}
            icon={{ name: 'delete', color: 'white' }}
            buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
            />
        )}
        >
        <Icon name="" />
        <ListItem.Content>
            <ListItem.Title>{usuario.email}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
        </ListItem.Swipeable>
    ))}
    </>
);
};

export default ListarUsuarios;
