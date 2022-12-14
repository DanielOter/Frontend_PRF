import { createRequest, createUrl } from "../helpers/request";

const createNotificationsService = async (data, token) => {
    try {
        const body = { newNot: data };
        const request = createRequest(token, "POST", body);
        const url = createUrl("notification/create");
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

const getNotificationsService = async (token) => {
    try {
        const request = createRequest(token, "GET");
        const url = createUrl("notification/");
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
export { createNotificationsService, getNotificationsService };
