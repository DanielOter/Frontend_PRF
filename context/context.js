import { createContext, useEffect, useState } from "react";
import keys from "../constants/keys";
import { getData } from "../helpers/store";

export const AppContext = createContext({});

export const AppContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isUp = true;
        if (isUp) {
            const lastDataFetch = async () => {
                const userData = JSON.parse(await getData(keys.USER));
                if (userData && isUp) {
                    setCurrentUser(userData);
                } else {
                    setCurrentUser(undefined);
                }
                setLoading(false);
            };
            lastDataFetch();
        }
        return () => {
            isUp = false;
        };
    }, [loading]);

    const value = {
        currentUser,
        setLoading,
    };
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
