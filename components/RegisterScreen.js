import React, { useState } from 'React'
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import keys from "../constants/keys";
import errors from "../constants/fireBaseErrors";
import { storeData } from "../helpers/store";
import { auth } from "../libs/auth";
import { createRequest, createUrl } from "../helpers/request";
//import { AppContext } from "../context/context";
import InputData from "./InputData"


function registerScreen() {
const {role, setRole} = useState(0) 
const {name, setName} = useState("")
const {lName, setLName} = useState("")
const {unit, setUnit} = useState(0) 
const {numContact, setNumContact} = useState("") // 50
const {mailContact, setMailContact} = useState("") // 50
const {typeID, setTypeID} = useState(0) 
const {numID, setNumID} = useState("") // 8
var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
//set screens to each role, emptied when called.  




return(<View>
            <View>
                <Input type="radio"  placeholder='Owner' style={styles.container} checked={setRole(1)} />
                <Input type="radio" placeholder='Administrator' style={styles.container} checked={setRole(2)}/>
                <Input type="radio" placeholder='Security' style={styles.container} checked={setRole(3)}/>
            </View>
            <View>
                <InputData placeholder='Name'  text={name} setter={setName} />
                <TextInput placeholder='Name' style={styles.container} 
                    onChangeText={(text) => setName(text)}/>
                <TextInput placeholder='Last name' style={styles.container}
                    onChangeText={(text) => setLName(text)}/>
                <TextInput placeholder='Unit' style={styles.container}
                    onChangeText={(text) => setUnit(text)}/>
                <TextInput placeholder='Phone contact' style={styles.container}
                    onChangeText={(text) => setNumContact(text)}/>
                <TextInput placeholder='Mail contact' style={styles.container}
                    onChangeText={(text) => setMailContact(text)}/>
                <TextInput placeholder='ID type' style={styles.container}
                    onChangeText={(text) => setTypeID(text)}/>
                <TextInput placeholder='ID number' style={styles.container}
                    onChangeText={(text) => setNumID(text)}/> 
             </View>
            <TextInput>
        </TextInput>



    </View>
        )
}


export default registerScreen;


const styles = StyleSheet.create({
    container: {
        width: 30,
        heighy: 5,
    },

})