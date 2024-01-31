import React from 'react'
import Index from '../views/dashboard/index'
// import { Switch, Route } from 'react-router-dom'

import Customer from '../views/dashboard/special-pages/Customer/AddCustomer'
import Default from '../layouts/dashboard/default';
import ViewCustomer from '../views/dashboard/special-pages/Customer/ViewCustomer';
import UpdateCustomer from'../views/dashboard/special-pages/Customer/UpdateCustomer'
import Cookies from "js-cookie";
import RegisterUser from '../views/dashboard/special-pages/Admin/RegisterUser'
import ViewUser from '../views/dashboard/special-pages/Admin/ViewUser'
import UpdatePass from '../views/dashboard/special-pages/Admin/UpdatePassword'
import { Navigate } from 'react-router-dom'; 
import UpdateUser from '../views/dashboard/special-pages/Admin/UpdateUser'
import Configuration from '../views/dashboard/special-pages/Configuration/Configuration'
import Home from '../views/dashboard/special-pages/Home/Home'

const Email=Cookies.get("userEmail")
const electricityrights = Cookies.get("electricityrights");
const maintenancerights = Cookies.get("maintenancerights");
const hasElectricityEditorRights =
electricityrights &&
(electricityrights.includes("electricityeditor") ||
  electricityrights.includes("electricityadmin") ||
  electricityrights.includes("electricitymanager")||
  electricityrights.includes("electricityreader")
  );


  const hasMaintenanceEditorRights =
  maintenancerights &&
  (maintenancerights.includes("maintenanceeditor") ||
  maintenancerights.includes("maintenanceadmin") ||
  maintenancerights.includes("maintenancemanager")||
  maintenancerights.includes("electricityreader"));
export const DefaultRouter = [
    {
        path: '*',
        element: <Default />,
        children: [
            {
                path: 'dashboard',
                element: Email ? <Index />: <Navigate to="/"/>
            },
            {
<<<<<<< HEAD
                path: 'dashboard/Customer',
                element: Email ? <Customer /> : <Navigate to="/" />,
            },{
                path: 'dashboard/ViewCustomer',
                element:  Email ? <ViewCustomer /> : <Navigate to="/" />,
            },
            {
                path: 'dashboard/updatecustomer',
                element:  Email ? <UpdateCustomer /> : <Navigate to="/" />,
            },
            {
                path: 'dashboard/RegisterUser',
                element: Email ? <RegisterUser /> : <Navigate to="/" />,
            },

            {
                path: 'dashboard/viewuser',
                element:  Email  ? <ViewUser /> : <Navigate to="/" />,
            },
            {
                path: 'dashboard/updatepass',
=======
                path: 'dashboard/Home/customer',
                element:Email ? <Customer /> : <Navigate to="/" />,
            },{
                path: 'dashboard/Home/ViewCustomer',
                element:Email ? <ViewCustomer /> : <Navigate to="/" />,
            },
            {
                path: 'dashboard/Home/updatecustomer',
                element: Email ? <UpdateCustomer /> : <Navigate to="/" />,
            },
            {
                path: 'dashboard/Home/RegisterUser',
                element:Email  ? <RegisterUser /> : <Navigate to="/" />,
            },

            {
                path: 'dashboard/Home/viewuser',
                element: Email ? <ViewUser /> : <Navigate to="/" />,
            },
            {
                path: 'dashboard/Home/updatepass',
>>>>>>> f802d370abe90b3dc72318777d10f5b1207f4c32
                element:Email ? <UpdatePass /> : <Navigate to="/" />,
            },

            {
<<<<<<< HEAD
                path: 'dashboard/updateuser',
                element:  Email ? <UpdateUser /> : <Navigate to="/" />,
            },
            {
                path: 'dashboard/configuration',
                element: Email ? <Configuration /> : <Navigate to="/" />,
            },

            {
                path: 'dashboard/Home',
                element: Email ? <Home /> : <Navigate to="/" />,
            },
=======
                path: 'dashboard/Home/updateuser',
                element: Email ? <UpdateUser /> : <Navigate to="/" />,
            },
            {
                path: 'dashboard/Home/configuration',
                element:Email? <Configuration /> : <Navigate to="/" />,
            },
            {
                path: 'dashboard/Home',
                element:Email? <Home /> : <Navigate to="/" />,
            },
            
>>>>>>> f802d370abe90b3dc72318777d10f5b1207f4c32
           
        ]
    }
]