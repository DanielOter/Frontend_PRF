import React, { useContext, useState } from "react";
import {View, StyleSheet, Text, TextInput,TouchableOpacity, RadioButton} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import keys from "../constants/keys";
import errors from "../constants/fireBaseErrors";
import { storeData } from "../helpers/store";
import { auth } from "../libs/auth";
import { createRequest, createUrl } from "../helpers/request";
import { AppContext } from "../context/context";
import { Button } from "react-native-web";


function Register({ navigation }) {
    const [error, setError] = useState({});
    const [networkError, setNetworkError] = useState({});
    const { setLoading } = useContext(AppContext);

    const [role, setRole] = useState("none");
    const [name, setName] = useState("juan");
    const [lName, setLName] = useState("juan");
    const [unit, setUnit] = useState("1A"); 
    const [numContact, setNumContact] =useState("12345678"); // 50
    const [mailContact, setMailContact] = useState("dsadas@dasd.com"); // 50
    const [typeID, setTypeID] = useState("asd");
    const [numID, setNumID] = useState("12345678"); // 8
    var validRegexMail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var validRegexIDNum =/^[a-zA-Z0-9]{1,8}$/
    var validRegexTypeID = /^[a-zA-Z]{1,8}$/
    var validRegexNumContact = /^[0-9]{8,50}$/
    var validRegexFullName = /^[a-zA-Z]{2,50}$/
    var validRegexUnit = /^[a-zA-Z0-9]{1,6}$/

    const validateNetworkError = (error) => {
        let emailExistError;
        let networkError;
        let passLengthError;

        if (error.message === errors.EMAIL_IN_USED) {
            emailExistError = "Usuario ya existe";
        }

        if (error.message === errors.EMAIL_MAX) {
            passLengthError = "Password debe ser de un minimo de 6 characters";
        }
        if (emailExistError === undefined && passLengthError === undefined) {
            networkError = "Network Error Intente de nuevo";
        }
        setNetworkError({
            passLengthError,
            emailExistError,
            networkError,
        });
    };

    const handleCreateUser = () => {
        if (validateInputs()) {
            console.log(mailContact)
            setError({});
            createUserWithEmailAndPassword(auth, mailContact)
                .then(({ user }) => {
                    console.log("Usuario creado!");
                    const userData = JSON.stringify({
                        mailContact: user.mailContact,
                        accessToken: user.stsTokenManager.accessToken,
                    });

                    const body = { nickname
                   //body 
                    };
                    const request = createRequest(
                        user.stsTokenManager.accessToken,
                        "POST",
                        body
                    );
                    const url = createUrl("signin");

                    fetch(url, request)
                        .then((response) => response.json())
                        .then((json) => {
                            setNetworkError({});
                            storeData(keys.USER, userData);
                            setLoading(true);
                        })
                        .catch((error) => {
                            console.error(error);
                            throw error;
                        });
                })
                .catch((error) => {
                    console.log(error);
                    validateNetworkError(error);
                });
        }
    };

    const handleLogin = () => navigation.navigate("Login");

    const validateInputs = () => { 
        let vRole = "";
        let vName = "";
        let vLName = "";
        let vUnit = "";
        let vNumContact = "";
        let vMail = "";
        let vIDType = "";
        let vIDNum = "";
        let correctInfo = true;
        

        if(role == "none")
            {vRole = "Error en la seleccion del rol";
            correctInfo = false;}
        
        if(!name.match(validRegexFullName))
            {vName = "Error en el ingrso del 'Nombre'";
            correctInfo = false;}

        if(!(lName.match(validRegexFullName)) )
            {vLName = "Error en el ingreso del 'Apellido'";
            correctInfo = false;}


        if(!(unit.match(validRegexUnit)))
            {vUnit = "Error en el ingreso de la 'Unidad'";
            correctInfo = false;}

        if(!(numContact.match(validRegexNumContact))){
            vNumContact = "Error en el ingreso del 'Numero de Contacto'";
            correctInfo = false;}

        if (!(mailContact.match(validRegexMail)) )
            {vMail = "Error en el ingreso del 'Mail'";
            correctInfo = false;}

        if(!(typeID.match(validRegexTypeID)))
            {vIDType = "Error en el ingreso del 'Tipo de Documento'";
            correctInfo = false;}
        
            if(!(numID.match(validRegexIDNum))) 
            {vIDNum = "Error en el ingreso del 'Numero de Documento'";
            correctInfo = false;} 

        if (correctInfo == false) {
            setError({ vRole, vName, vLName, vUnit, vNumContact, vMail, vIDType, vIDNum });
            return false;
        }
        return true;
       
        }

    function changeRole(num) {
        setRole(num)
        console.log(num)
    }



    return (
    <View>
            <View  style={styles.container}>
                 <View >
                    <View style={{flexDirection: "row", marginHorizontal: 20}}>
                    <TouchableOpacity
                            onPress={() => changeRole("Administrador")}
                            style={styles.rolesButton} >
                            <Text style={styles.roleText}>Administrador</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => changeRole("Dueño")} style={styles.rolesButton}>
                            <Text style={styles.roleText}>Dueño</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                            onPress={() => changeRole("Seguridad")}
                            style={styles.rolesButton}>
                            <Text style={styles.roleText}>Seguridad</Text>
                    </TouchableOpacity>
                    </View>
                    <View style={{alignItems: "center"}}>
                        <Text style={styles.text}>Rol Seleccionado: {role}</Text>                    
                        <View>
                        <Text  style={styles.error}>{error.vRole}</Text>
                        </View>
                    </View>

                </View>

                <View style={styles.textInputHolders}>
                    <View>

                    <Text style={styles.text}>Nombre</Text>
                        <View style={styles.component}>
                            <TextInput 
                                value = {name} 
                                placeholder={"Larry"} 
                                onChangeText={(text) => setName(text)}
                                style={styles.textInput}
                                />
                        </View>
                    </View>
                    <View>
                        <Text  style={styles.error}>{error.vName}</Text>
                    </View>
                </View>
                <View style={styles.textInputHolders}>
                    <View>
                    <Text style={styles.text}>Apellido</Text>
                        <View style={styles.component}>
                            <TextInput 
                                value = {lName} 
                                placeholder={"Hopper"} 
                                onChangeText={(text) => setLName(text)}
                                style={styles.textInput}
                                />
                        </View>
                    </View>
                    <View>
                        <Text  style={styles.error}>{error.vLName}</Text>
                    </View>
                </View>
                <View style={styles.textInputHolders}>
                    <View>
                    <Text style={styles.text}>Unidad</Text>
                        <View style={styles.component}>
                            <TextInput 
                                value = {unit} 
                                placeholder={"1A"} 
                                onChangeText={(text) => setUnit(text)}
                                style={styles.textInput}
                                />
                        </View>
                    </View>
                    <View>
                        <Text  style={styles.error}>{error.vUnit}</Text>
                    </View>
                </View>
                <View style={styles.textInputHolders}>
                    <View>
                    <Text style={styles.text}>Numero de Contacto </Text>
                        <View style={styles.component}>
                            <TextInput 
                                value = {numContact} 
                                placeholder={"1146461234"} 
                                onChangeText={(text) => setNumContact(text)}
                                style={styles.textInput}
                                />
                        </View>
                    </View>
                    <View>
                        <Text  style={styles.error}>{error.vNumContact}</Text>
                    </View>
                </View>
                <View style={styles.textInputHolders}>
                    <View>
                    <Text style={styles.text}>Mail</Text>
                        <View style={styles.component}>
                            <TextInput 
                                value = {mailContact} 
                                placeholder={"LarryHopper@fakemail.com"} 
                                onChangeText={(text) => setMailContact(text)}
                                style={styles.textInput}
                                />
                        </View>
                    </View>
                    <View>
                        <Text  style={styles.error}>{error.vMail}</Text>
                    </View>
                </View>
                <View style={styles.textInputHolders}>
                    <View>
                    <Text style={styles.text}>Tipo de Documento</Text>
                        <View style={styles.component}>
                            <TextInput 
                                value = {typeID} 
                                placeholder={"DNI"} 
                                onChangeText={(text) => setTypeID(text)}
                                style={styles.textInput}
                                />
                        </View>
                    </View>
                    <View>
                        <Text  style={styles.error}>{error.vIDType}</Text>
                    </View>
                </View>
                <View style={styles.textInputHolders}>
                    <View>
                    <Text style={styles.text}>Numero de Documento</Text>
                        <View style={styles.component}>
                            <TextInput 
                                value = {numID} 
                                placeholder={"12345678"} 
                                onChangeText={(text) => setNumID(text)}
                                style={styles.textInput}
                                />
                        </View>
                    </View>
                    <View>
                        <Text  style={styles.error}>{error.vIDNum}</Text>
                    </View>
                </View>
        <View  style={styles.buttons}>
        <TouchableOpacity
                    onPress={handleCreateUser}
                    style={styles.button}
                >
                    <Text style={styles.buttonsText}>Registrar</Text>
                </TouchableOpacity>
        </View>
        
        </View>
    </View>
        
    );
}

export default Register;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        flex: 1,
        alignItems: "center",
    },
    info: {
        width: "100%",
        borderRadius: 5,
        height: 50,

        borderWidth: 1,
        borderColor: "#484648",
        padding: 12,
        justifyContent: "center",
    },
    buttons: {
        alignItems: "center",
        justifyContent: "space-around",
    },
    button: {
        width: 350,
        height: 60,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0470dc",
        borderColor: "#ffffff",
        borderWidth: 2,
        marginTop: 20,
    },
    buttonsText: {
        color: "#ffffff",
        fontSize: 20,
    },
    textInputHolders: {
        width: "50%",
        paddingBottom: 20,
    },
    text: {
        marginTop: 5,
        paddingLeft: 15,
        color: "#000000",
        fontSize: 15,
    },
    textInput: {
        color: "#000000",
        fontSize: 14,
        backgroundColor: "#ffffff",
        justifyContent: "center",
        alignItems: "center",
        placeholderTextColor:"#767476",
    },   
    error: {
        color: "#ff0000",
        fontSize: 10,
    },
    component: {
        width: "100%",
        borderRadius: 5,
        height: 50,
    
        borderWidth: 1,
        borderColor: "#484648",
        padding: 12,
        justifyContent: "center",
    },
    rolesButton: {
        width: 110,
        height: 40,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#CBC3E3",
        borderColor: "#ffffff",
        borderWidth: 2,
        marginTop: 10,
    },
    roleText: {
        color: "#ffffff",
        fontSize: 15,
    },

});
