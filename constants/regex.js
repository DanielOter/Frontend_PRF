export default {
    MAIL: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    ID_NUM: /^[0-9]{1,15}$/,
    TYPE_ID: /^[a-zA-Z]{1,8}$/,
    NUM_CONTACT: /^[0-9]{8,50}$/,
    FULL_NAME: /^[a-zA-Z]{2,50}$/,
    UNIT: /^[a-zA-Z0-9]{1,6}$/,
    DATE: "\\d{4}-[01]\\d-[0-3]\\d",
    PASS: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/
};
