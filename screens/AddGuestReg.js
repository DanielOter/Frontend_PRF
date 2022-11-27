import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "../components/Header";
import { AppContext } from "../context/context";
import CustomDropdown from "../components/CustomDropdown";
import CustomCalendar from "../components/CustomCalendar";
import * as Device from "expo-device";
import { CustomInput } from "../components/form/CustomInput";
import {
    crearRegGuestService,
    getAllGuestService,
} from "../services/guestService";
import { CustomButton } from "../components/CustomButton";
import { QrCode } from "../components/QrCode";
import errors from "../constants/errors";
import regex from "../constants/regex";

export const AddGuestReg = () => {
    const { currentUser } = useContext(AppContext);
    const [guestList, setguestList] = useState([]);
    const [guest, setguest] = useState(null);
    const [startDate, setStartDate] = useState("2022-10-25");
    const [endDate, setEndDate] = useState("2022-10-25");
    const [qrInfo, setQrInfo] = useState(null);
    const [error, setError] = useState("");
    const isMobile = Device.osName === "Android";
    const abortController = new AbortController();

    useEffect(() => {
        const getList = async () => {
            await getAllGuestService(currentUser.token).then((guests) => {
                setguestList(
                    guests.map((g) => {
                        return {
                            value: g.gue_name + " " + g.gue_lastName,
                            id: g.gue_id,
                        };
                    })
                );
            });
        };
        getList();
        return () => abortController.abort();
    }, []);

    const sendNewReg = async () => {
        if (isValid(startDate) && isValid(endDate) && guest != null) {
            const data = {
                host: currentUser.email,
                guestId: guest.id,
                entry: startDate,
                exit: endDate,
            };
            const response = await crearRegGuestService(
                data,
                currentUser.token
            );
            console.log("🚀 ~ file: AddGuestReg.js ~ line 58 ~ sendNewReg ~ response", response)
            const entry = response.reg_entryTime.split("T")[0];
            const exit = response.reg_exitTime.split("T")[0];
            setQrInfo({
                regId: response.reg_id,
                hostName: response.hostName,
                guestname: response.guestName,
                entry: entry,
                exit: exit,
            });
        } else {
            setError(errors.REG_ERROR);
        }
    };

    const isValid = (text) => {
        if (text == null || !text.match(regex.DATE)) return false;
        const date = new Date(text);
        const timestamp = date.getTime();
        if (typeof timestamp !== "number" || Number.isNaN(timestamp)) {
            return false;
        }

        return date.toISOString().startsWith(text);
    };

    return (
        <View style={styles.container}>
            <Header header={"Registro Visita"}></Header>
            {!qrInfo ? (
                <View style={styles.innerContainer}>
                    <View>
                        <CustomDropdown
                            data={guestList}
                            holder={"Invitado"}
                            setValue={setguest}
                            item={guest}
                        />
                        <View>
                            {isMobile ? (
                                <View>
                                    <Text>{startDate}</Text>
                                    <CustomCalendar
                                        title={"Ingreso"}
                                        setDate={setStartDate}
                                    />
                                    <Text>{endDate}</Text>
                                    <CustomCalendar
                                        title={"Salida"}
                                        setDate={setEndDate}
                                    />
                                </View>
                            ) : (
                                <View style={styles.center}>
                                    <CustomInput
                                        value={startDate}
                                        setValue={setStartDate}
                                        holder={"ingreso (AAAA-MM-DD)"}
                                        text={"Fecha Ingreso"}
                                    />
                                    <CustomInput
                                        value={endDate}
                                        setValue={setEndDate}
                                        holder={"salida (AAAA-MM-DD)"}
                                        text={"Fecha Salida"}
                                    />
                                </View>
                            )}
                        </View>
                        <CustomButton onPress={sendNewReg} text={"Enviar"} />
                        {error && (
                            <View style={styles.center}>
                                <Text style={styles.error}>{error}</Text>
                            </View>
                        )}
                    </View>
                </View>
            ) : (
                <View style={styles.center}>
                    {qrInfo && <QrCode data={qrInfo} />}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
        alignItems: "center",
    },
    innerContainer: {
        width: "50%",
    },
    center: {
        alignItems: "center",
    },
    button: {
        alignItems: "center",
        width: "10%",
    },
    error: {
        color: "#ff0000",
        fontSize: 15,
    },
});
