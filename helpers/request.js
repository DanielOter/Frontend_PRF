import { LOCAL_URL } from "@env";

const createUrl = (path) => {
    return LOCAL_URL.concat(path);
};

const createHeader = (token) => {
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
};

const createRequest = (token, method, data) => {
    const request = {
        method,
        headers: createHeader(token),
    };
    if (data) {
        request.body = JSON.stringify(data);
    }

    return {
        ...request,
    };
};

export { createRequest, createUrl };
