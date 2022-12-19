import React from "react";
import QRCode from "react-native-qrcode-svg";

export const QrCodeGenerator = ({ value, getRef }) => {
    return (
        <QRCode
            value={value}
            size={250}
            color="black"
            backgroundColor="white"
            getRef={getRef}
        />
    );
};
