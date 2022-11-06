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
            emailExistError = "Usuario   ya existe";
        }

        if (error.message === errors.EMAIL_MAX) {
            passLengthError = "Password debe ser de un minimo de 6 characters";
        }
        if (emailExistError === undefined && passLengthError === undefined) {
            networkError = "Network Error Try again";
        }
        setNetworkError({
            passLengthError,
            emailExistError,
            networkError,
        });
    };

    const handleCreateUser = () => {
        console.log("creando " +  validateInputs() )
        if (validateInputs()) {
            console.log("paso")
            console.log(mailContact)
            setError({});
            createUserWithEmailAndPassword(auth, mailContact)
                .then(({ user }) => {
                    console.log("User created!");
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
            {vRole = "Error in role selection";
            correctInfo = false;}
        
        if(!name.match(validRegexFullName))
            {vName = "Error in name field";
            correctInfo = false;}

        if(!(lName.match(validRegexFullName)) )
            {vLName = "Error in last name field";
            correctInfo = false;}


        if(!(unit.match(validRegexUnit)))
            {vUnit = "Error in unit field";
            correctInfo = false;}

        if(!(numContact.match(validRegexNumContact))){
            vNumContact = "Error in contact number field";
            correctInfo = false;}

        if (!(mailContact.match(validRegexMail)) )
            {vMail = "Contact Mail Invalid";
            correctInfo = false;}

        if(!(typeID.match(validRegexTypeID)))
            {vIDType = "Error in ID Type field";
            correctInfo = false;}
        
            if(!(numID.match(validRegexIDNum))) 
            {vIDNum = "Error in ID number field";
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
                            onPress={() => changeRole("Administrator")}
                            style={styles.rolesButton} >
                            <Text style={styles.roleText}>Administrator</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => changeRole("Owner")} style={styles.rolesButton}>
                            <Text style={styles.roleText}>Owner</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                            onPress={() => changeRole("Security")}
                            style={styles.rolesButton}>
                            <Text style={styles.roleText}>Security</Text>
                    </TouchableOpacity>
                    </View>
                    <View style={{alignItems: "center"}}>
                        <Text style={styles.text}>Selected Role: {role}</Text>                    
                        <View>
                        <Text  style={styles.error}>{error.vRole}</Text>
                        </View>
                    </View>

                </View>

                <View style={styles.textInputHolders}>
                    <View>

                    <Text style={styles.text}>Name</Text>
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
                    <Text style={styles.text}>Last Name</Text>
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
                    <Text style={styles.text}>Unit</Text>
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
                    <Text style={styles.text}>Contact Phone Number</Text>
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
                    <Text style={styles.text}>ID Type</Text>
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
                    <Text style={styles.text}>ID Number</Text>
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
                    <Text style={styles.buttonsText}>Register</Text>
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
