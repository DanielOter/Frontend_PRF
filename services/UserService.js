import { createRequest, createUrl } from "../helpers/request";
import keys from "../constants/keys";
import { storeData } from "../helpers/store";

const addUserService = async (data, token) => {
    try {
        const body = { newUser: data };
        const request = createRequest(token, "POST", body);
        const url = createUrl("user/create");
        const response = await fetch(url, request);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
};

const logInService = async (email, token, load) => {
    try {
        const request = createRequest(token, "GET");
        const url = createUrl("user/email/" + email);
        await fetch(url, request)
            .then((response) => response.json())
            .then((json) => {
                const userData = {
                    email: email,
                    accessToken: token,
                    role: json.role,
                };
                console.log("🚀 ~ file: UserService.js ~ line 30 ~ .then ~ userData", userData)
                console.log("Signed in!");
                storeData(keys.USER, JSON.stringify(userData));
                load();
                return json;
            })
            .catch((error) => {
                console.log(error);
                throw error;
            });
    } catch (error) {
        throw error;
    }
};

export { addUserService, logInService };
