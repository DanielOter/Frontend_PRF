import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/Home";
import Login from "./screens/Login";
import { AppContext } from "./context/context";
import { CreateGuest } from "./screens/CreateGuest";
import { AddGuestReg } from "./screens/AddGuestReg";
import { RegisterUser } from "./screens/RegisterUser";

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
                            name="CreateGuest"
                            component={CreateGuest}
                        />
                        <Stack.Screen
                            name="AddGuestReg"
                            component={AddGuestReg}
                        />
                        <Stack.Screen
                            name="Register"
                            component={RegisterUser}
                        />
                    </Stack.Group>
                ) : (
                    <Stack.Group>
                        <Stack.Screen
                            name="Login"
                            component={Login}
                            options={{ headerLeft: null, title: "Login" }}
                        />
                    </Stack.Group>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;
