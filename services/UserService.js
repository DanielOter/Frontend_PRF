import { getData } from "../helpers/store";
import { createRequest, createUrl } from "../helpers/request";
import keys from "../constants/keys";

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

const deleteFriend = async (emailFriend) => {
    try {
        const currentUser = await getData(keys.USER);
        const userData = JSON.parse(currentUser);
        const body = { emailFriend };
        const request = createRequest(userData.accessToken, "DELETE", body);
        const url = createUrl("friend");
        const response = await fetch(url, request);
        await response.json();
    } catch (error) {
        throw error;
    }
};
export { addFriendService, deleteFriend };
