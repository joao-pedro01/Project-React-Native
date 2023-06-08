import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../screens/Login'
import Cadastro from '../screens/Cadastro'
import ListarUsuarios from '../screens/ListarUsuarios';
import InfoUsuario from '../screens/InfoUsuario';

const Stack = createNativeStackNavigator()
function AppStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                options={{ headerShown: false }}
                component={Login} />
            <Stack.Screen
                name="ListarUsuarios"
                options={{ headerShown: false }}
                component={ListarUsuarios} />
            <Stack.Screen
                name="Cadastro"
                options={{ headerShown: false }}
                component={Cadastro} />
            <Stack.Screen
                name="InfoUsuario"
                options={{ headerShown: false }}
                component={InfoUsuario} />
            {/* <Stack.Screen 
                name="Home" 
                component={Home} 
                options ={{ headerTitle: 'Fatec Cripto'}} />
            <Stack.Screen 
                name="Nova Cripto" 
                component={AddCripto} 
                options ={{ presentation: 'modal'}} /> 
            <Stack.Screen 
                name="Editar Cripto" 
                component={EditCripto} 
                options ={{ presentation: 'modal'}} />         
            <Stack.Screen
                name="Signup"
                options={{ headerShown: false }}
                component={Signup} /> */}
            
        </Stack.Navigator>
    )
}
export default function Navigation() {
    return (
        <NavigationContainer>
            <AppStack />
        </NavigationContainer>
    )
}