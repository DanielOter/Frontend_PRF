import { createRequest, createUrl } from "../helpers/request";
import keys from "../constants/keys";
import { storeData } from "../helpers/store";

const addUserService = async (data, token) => {
    try {
        const body = { newUser: data };
        const request = createRequest(token, "POST", body);
        const url = createUrl("user/create");
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

const logInService = async (email, token, load) => {
    try {
        const request = createRequest(token, "GET");
        const url = createUrl("user/email/" + email);
        const response = await fetch(url, request)
            .then((response) => response.json())
            .then((json) => {
                const userData = {
                    email: email,
                    token: token,
                    role: json.usr_rolId,
                    alarm: false,
                };
                console.log("Signed in!");
                storeData(keys.USER, JSON.stringify(userData));
                load(true);
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

export { addUserService, logInService };
