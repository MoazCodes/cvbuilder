import React, { useEffect } from "react";
import logo from "./logo.svg";
import Navbar from "./componenets/Navbar";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import "animate.css/animate.min.css";
// @ts-ignore
import WOW from "wowjs";
import Templates from "./Pages/Templates/Templates";
import { Route, Routes } from "react-router-dom";
import CvInputs from "./componenets/CvInputs/CvInputs";
import Register from "./Pages/Register";
import Home from "./Pages/Home/Home";
import Applications from "./Pages/Applications/Applications";
function App() {
    useEffect(() => {
        new WOW.WOW({
            live: false,
        }).init();
    }, []);
    return (
        <>
            <Navbar />
            
            <Routes>
                <Route path="/" element={<CvInputs />} >
                    <Route path="/" element={<Home />} />
                    <Route path="/templates" element={<Templates />} />
                    <Route path="/register" element={<Register />} />
                </Route>
                <Route path="/applications" element={<Applications/>}/>
            </Routes>
        </>
    );
}

export default App;
