import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/Home";
import Login from "./screens/Login";
import { AppContext } from "./context/context";
import { CreateGuest } from "./screens/CreateGuest";
import { AddGuestReg } from "./screens/AddGuestReg";
import { RegisterUser } from "./screens/RegisterUser";
import MapScreen from "./screens/MapScreen";
import { AddNotification } from "./screens/AddNotification";
import { QrScanner } from "./screens/QrScanner";

function Navigation() {
    const Stack = createStackNavigator();
    const { currentUser } = useContext(AppContext);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {currentUser ? (
                    <Stack.Group>
                        <Stack.Screen
                            name="Home"
                            component={Home}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="Agregar Invitado"
                            component={CreateGuest}
                        />
                        <Stack.Screen
                            name="Agregar Registro"
                            component={AddGuestReg}
                        />
                        <Stack.Screen
                            name="Administra Usuarios"
                            component={RegisterUser}
                        />
                        <Stack.Screen
                            name="Cargar Notificaciones"
                            component={AddNotification}
                        />
                        <Stack.Screen
                            name="Lector QR"
                            component={QrScanner}
                        />
                        <Stack.Screen name="Map" component={MapScreen} />
                    </Stack.Group>
                ) : (
                    <Stack.Group>
                        <Stack.Screen
                            name="Login"
                            component={Login}
                            options={{ headerShown: false }}
                            
                        />
                    </Stack.Group>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;
