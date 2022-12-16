import { createRequest, createUrl } from "../helpers/request";

const createAlertService = async (data, token) => {
    console.log(
        "🚀 ~ file: alertService.js ~ line 4 ~ createAlertService ~ data",
        data
    );
    try {
        const body = { newAlert: data };
        const request = createRequest(token, "POST", body);
        const url = createUrl("alert/create");
        const response = await fetch(url, request)
            .then((response) => response.json())
            .then((res) => {
                return res;
            })
            .catch((error) => {
                console.log(error);
                throw error;
            });
        return response;
    } catch (error) {
        throw error;
    }
};

const getAllAlerts = async (token) => {
    try {
        const request = createRequest(token, "GET");
        const url = createUrl("alert/");
        const response = await fetch(url, request)
            .then((res) => res.json())
            .then((json) => {
                return json;
            })
            .catch((error) => {
                console.log(error);
                throw error;
            });
        return response;
    } catch (error) {
        throw error;
    }
};

const turnOffAlert = async (id, token) => {
    try {
        const request = createRequest(token, "PUT");
        const url = createUrl("alert/turnOff/" + id);
        const response = await fetch(url, request)
            .then((res) => res.json())
            .then((json) => {
                return json;
            })
            .catch((error) => {
                console.log(error);
                throw error;
            });
        return response;
    } catch (error) {
        throw error;
    }
};

export { createAlertService, getAllAlerts, turnOffAlert };
