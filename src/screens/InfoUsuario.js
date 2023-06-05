import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const FormularioDesativado = ({navigation}) => {
    const [usuario, setUsuario] = useState({
        _id: '1',
        nome: 'John Doe',
        tipoUsuario: 1,
        email: 'email@eamil.com',
        senha: '123456',
    });
    console.log(usuario)
    return (
        <View style={styles.container}>
        <TextInput
            style={styles.input}
            placeholder="Nome"
            value={usuario.nome}
            editable={false}
        />
        <TextInput
            style={styles.input}
            placeholder="Email"
            value="johndoe@example.com"
            editable={true}
        />
        <TextInput
            style={styles.input}
            placeholder="Senha"
            type="password"
            editable={true}
        />
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
});

export default FormularioDesativado;
