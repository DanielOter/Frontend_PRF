import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import { AppContext } from "./context/context";

function Navigation() {
    const Stack = createStackNavigator();
    const { currentUser } = useContext(AppContext);

    return (
        <NavigationContainer>
            {currentUser ? (
                <Stack.Navigator>
                    <Stack.Screen
                        name="Home"
                        component={Home}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            ) : (
                <Stack.Navigator>
                    <Stack.Screen
                        name="Login"
                        component={Login}
                        options={{ headerLeft: null, title: "Login" }}
                    />
                    <Stack.Screen
                        name="Register"
                        component={Register}
                        options={{ headerLeft: null, title: "Register" }}
                    />
                </Stack.Navigator>
            )}
        </NavigationContainer>
    );
}

export default Navigation;
