import React from 'react'
import Index from '../views/dashboard/index'
// import { Switch, Route } from 'react-router-dom'

import Customer from '../views/dashboard/special-pages/AddCustomer'
import Default from '../layouts/dashboard/default';
import ViewCustomer from '../views/dashboard/special-pages/ViewCustomer';
import UpdateCustomer from'../views/dashboard/special-pages/UpdateCustomer'
import Cookies from "js-cookie";
import RegisterUser from '../views/dashboard/special-pages/Admin/RegisterUser'
import ViewUser from '../views/dashboard/special-pages/Admin/ViewUser'
import UpdatePass from '../views/dashboard/special-pages/Admin/UpdatePassword'
import { Navigate } from 'react-router-dom'; 
import UpdateUser from '../views/dashboard/special-pages/Admin/UpdateUser'



const Email=Cookies.get("userEmail")

export const DefaultRouter = [
    {
        path: '*',
        element: <Default />,
        children: [
            {
                path: 'dashboard',
                element: <Index />
            },
            {
                path: 'dashboard/Customer',
                element: Cookies.get("userEmail") ? <Customer /> : <Navigate to="/" />,
            },{
                path: 'dashboard/ViewCustomer',
                element: Cookies.get("userEmail") ? <ViewCustomer /> : <Navigate to="/" />,
            },
            {
                path: 'dashboard/updatecustomer',
                element: Cookies.get("userEmail") ? <UpdateCustomer /> : <Navigate to="/" />,
            },
            {
                path: 'dashboard/RegisterUser',
                element: Cookies.get("userEmail") ? <RegisterUser /> : <Navigate to="/" />,
            },

            {
                path: 'dashboard/viewuser',
                element: Cookies.get("userEmail") ? <ViewUser /> : <Navigate to="/" />,
            },
            {
                path: 'dashboard/updatepass',
                element: Cookies.get("userEmail") ? <UpdatePass /> : <Navigate to="/" />,
            },

            {
                path: 'dashboard/updateuser',
                element: Cookies.get("userEmail") ? <UpdateUser /> : <Navigate to="/" />,
            },
           
        ]
    }
]