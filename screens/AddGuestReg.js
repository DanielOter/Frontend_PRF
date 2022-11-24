import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "../components/Header";
import { AppContext } from "../context/context";
import CustomDropdown from "../components/CustomDropdown";
import CustomCalendar from "../components/CustomCalendar";

const data = [{ value: "1" }, { value: "2" }, { value: "3" }];

export const AddGuestReg = () => {
    const { currentUser } = useContext(AppContext);
    const [guestList, setguestList] = useState([]);
    const [guest, setguest] = useState(null);

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {}, []);

    return (
        <View>
            <Header header={"Add guest register"}></Header>
            <View style={styles.container}>
                <CustomDropdown
                    data={data}
                    holder={"Invitado"}
                    setValue={setguest}
                    value={guest}
                />
                <View>
                    <Text>{startDate}</Text>
                    <CustomCalendar title={"Ingreso"} setDate={setStartDate} />
                    <Text>{endDate}</Text>
                    <CustomCalendar title={"Salida"} setDate={setEndDate} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // justifyContent: "center",
        // alignItems: "center",
    },
});
