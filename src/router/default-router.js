import React from 'react'
import Index from '../views/dashboard/index'
// import { Switch, Route } from 'react-router-dom'

import Customer from '../views/dashboard/special-pages/AddCustomer'
import Default from '../layouts/dashboard/default';
import ViewCustomer from '../views/dashboard/special-pages/ViewCustomer';
import Cookies from "js-cookie";

import { Navigate } from 'react-router-dom'; 
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
                path: 'dashboard/special-pages/Customer',
                element: Cookies.get("userEmail") ? <Customer /> : <Navigate to="/" />,
            },{
                path: 'dashboard/special-pages/ViewCustomer',
                element: Cookies.get("userEmail") ? <ViewCustomer /> : <Navigate to="/" />,
            },
           
        ]
    }
]