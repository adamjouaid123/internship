import {  useState } from "react";
import { createBrowserRouter, RouterProvider, redirect, } from "react-router-dom";
// import Statistics from "./components/Statistics";
import { UserDataContext, UserDataStore } from "./stores/UserDataStore";
import { ToastContainer, toast } from "react-toastify";
import React from "react";
import { createRoot } from 'react-dom/client';
import "./global.css"

import Statistics from "./routes/Statistics";
import RouterLayout from "./routes/RouterLayout";
import Form from "./routes/Form";
import Home from "./routes/Home";
import Login from "./routes/Login";

const App = () => {
    const [userData, setUserData] = useState(new UserDataStore())
    
    console.log(userData.role)

    const router = createBrowserRouter([
        {
            path: "/",
            element: <RouterLayout />,
            loader: () => (userData.token ? null : redirect("/login")),
            children: [
                {
                    path: "/home",
                    element: <Home />,
                    loader: () => {
                        if (userData.token 
                            // && (userData.role === 1)
                        ) {
                            return null
                        } else if (userData.token) {
                            toast.error("Unauthorized access")
                            return redirect("/home"); 
                        } else {
                            return redirect("/login"); 
                        }
                    },
                    children: [
                        {
                            path: "/home/new-form",
                            element: <Form />,
                            loader: () => {
                                if (userData.token 
                                    // && userData.role === 1
                                ) {
                                    return null
                                } else if (userData.token) {
                                    toast.error("Unauthorized access")
                                    return redirect("/home"); 
                                } else {
                                    return redirect("/login"); 
                                }
                            }
                        },
                        {
                            path: "/home/form/:formId",
                            element: <Form />,
                            loader: () => {
                                if (userData.token
                                    //  && (userData.role === 1 || userData.role === 2)
                                    ) {
                                    return null
                                } else
                                if (userData.token) {
                                    toast.error("Unauthorized access")
                                    return redirect("/home"); 
                                } else {
                                    return redirect("/login"); 
                                }
                            }
                        },
                    ]
                },
                {
                    path: "/statistics",
                    element: <Statistics />,
                    loader: () => {
                        if (userData.token 
                            // && (userData.role === 1)
                        ) {
                            return null
                        } else if (userData.token) {
                            toast.error("Unauthorized access")
                            return redirect("/home"); 
                        } else {
                            return redirect("/login"); 
                        }
                    }
                },
            ]
        },
        {
            path: "/login",
            element: <Login />,
            loader: () => (userData.token ? redirect("/home") : null)
        },
        {
            path: "/*",
            loader: () => (userData.token ? redirect("/home") : redirect("/login"))
        },
    
    ])

    return <UserDataContext.Provider value={[userData, setUserData]}>
        <RouterProvider router={router} />
        <ToastContainer position="bottom-right"/>
    </UserDataContext.Provider>
};



createRoot(document.getElementById('root')).render(<App />);