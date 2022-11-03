import { createRequest, createUrl } from "../helpers/request";

const getNotificationsService = async (token) => {
    try {
        const request = createRequest(token, "GET");
        const url = createUrl("notifications");
        const response = await fetch(url, request);
        const result = await response.json();

        return result;
    } catch (error) {
        throw error;
    }
};

export { getNotificationsService };
