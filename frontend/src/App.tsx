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
import Login from "./Pages/Login";
import Applications from "./Pages/Applications/Applications";
import Jobs from "./Pages/Jobs/Jobs";
import Footer from "./componenets/Footer";
import NotFound from "./Pages/NotFound/NotFound";
import MyCvs from "./Pages/MyCvs";
import ProtectedRoute from "./componenets/ProtectedRoute/ProtectedRoute";
import UserProvider from "./Context/UserContext";

function App() {
    useEffect(() => {
        new WOW.WOW({
            live: false,
        }).init();
    }, []);
    return (
        <>
            <UserProvider>
                <Navbar />
                <MyCvs />
                <Routes>
                    <Route
                        path=""
                        element={
                            <>
                                <Home />
                                <Footer />
                            </>
                        }
                    />

                    <Route
                        path="/templates"
                        element={
                            <ProtectedRoute>
                                <Templates />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/jobs"
                        element={
                            <ProtectedRoute>
                                <Jobs />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/applications"
                        element={
                            <ProtectedRoute>
                                <Applications />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/templates/:id"
                        element={
                            <ProtectedRoute>
                                <CvInputs />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                {/* <Footer /> */}
            </UserProvider>
        </>
    );
}

export default App;
