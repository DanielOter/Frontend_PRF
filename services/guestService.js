import { createRequest, createUrl } from "../helpers/request";

const createGuestService = async (data, token) => {
    try {
        const body = { guest: data };
        const request = createRequest(token, "POST", body);
        const url = createUrl("guest/create");
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

export { createGuestService };
