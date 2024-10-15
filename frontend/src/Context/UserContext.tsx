import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { User } from "../Interfaces/User";
import { CvModel } from "../Interfaces/CvInterfaces";
import axios from "axios";
import {jwtDecode} from "jwt-decode"
import { useNavigate } from "react-router-dom";
export const UserContext = createContext<any >(
    undefined
);
interface UserProviderProps {
    children: React.ReactNode;
}

interface UserContextType {
    userData: User | null;
    isLoggedIn: () => boolean;
}

interface UserCvs{
    data:CvModel[];
}

interface tokenData{
    exp:number;
    iat:number;
    user:User;
}

const UserProvider = (props: UserProviderProps) => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState<User | null>(null);
    const [userCvs, setUserCvs] = useState<UserCvs>({ data: [] });
    const [getCvsErrors ,setGetCvsErrors]= useState("");
    const saveUserData = ()=>{
        const encodedData = localStorage.getItem("token");
        let decodedData:tokenData;
        if(encodedData){
            decodedData=jwtDecode(encodedData);
            setUserData(decodedData.user)
            console.log(decodedData)
            console.log(decodedData.user)
        }
    }

    const getUserId = ()=>{
        return userData?.id;
    }

    function logout() {
        localStorage.removeItem("token");
        // updateUserData();
        setUserData(null);
        console.log("loged out ");
        navigate('/login')
    }

    useEffect(()=>{
        saveUserData();
    },[])

    useEffect(() => {
        console.log("asdasd", getUserId())
        axios
            .get(`http://127.0.0.1:8000/usercvs/${getUserId()}`)
            .then((res) => {
                console.log(res);
                setUserCvs(res.data);
                
            })
            .catch((error) => {
                
                console.log(error)
            });
    }, [userData]);
    
    return (
        <UserContext.Provider value={{ userData,userCvs,setUserCvs,getCvsErrors,setGetCvsErrors,saveUserData,setUserData,logout,getUserId}}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserProvider;
