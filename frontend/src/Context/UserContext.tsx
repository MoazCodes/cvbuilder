import React, { useState } from "react";
import { createContext } from "react";
import { User } from "../Interfaces/User";
export const UserContext = createContext<any >(
    undefined
);
interface UserProviderProps {
    children: React.ReactNode;
}

interface UserContextType {
    userData: User | undefined;
    isLoggedIn: () => boolean;
}
const UserProvider = (props: UserProviderProps) => {
    const [userData, setUserData] = useState<User | undefined>(undefined);

    let isLoggedIn = () => {
        return localStorage.getItem("token") !== null;
    };
    return (
        <UserContext.Provider value={{ userData, isLoggedIn }}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserProvider;
