import React, { useState } from "react";
import { Button, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const CustomCalendar = ({ title, setDate }) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        const newDate = year + "-" + month + "-" + day;
        setDate(newDate);
        hideDatePicker();
    };

    return (
        <View>
            <Button title={title} onPress={showDatePicker} />
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </View>
    );
};

export default CustomCalendar;
