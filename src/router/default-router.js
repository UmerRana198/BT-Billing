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
                element: <Index />
            },
            {
                path: 'dashboard/Customer',
                element:hasElectricityEditorRights ||hasMaintenanceEditorRights ? <Customer /> : <Navigate to="/" />,
            },{
                path: 'dashboard/ViewCustomer',
                element: hasElectricityEditorRights  ||hasMaintenanceEditorRights ? <ViewCustomer /> : <Navigate to="/" />,
            },
            {
                path: 'dashboard/updatecustomer',
                element: hasElectricityEditorRights   ||hasMaintenanceEditorRights ? <UpdateCustomer /> : <Navigate to="/" />,
            },
            {
                path: 'dashboard/RegisterUser',
                element:hasElectricityEditorRights  ||hasMaintenanceEditorRights  ? <RegisterUser /> : <Navigate to="/" />,
            },

            {
                path: 'dashboard/viewuser',
                element: hasElectricityEditorRights  ||hasMaintenanceEditorRights  ? <ViewUser /> : <Navigate to="/" />,
            },
            {
                path: 'dashboard/updatepass',
                element:hasElectricityEditorRights  ||hasMaintenanceEditorRights ? <UpdatePass /> : <Navigate to="/" />,
            },

            {
                path: 'dashboard/updateuser',
                element: hasElectricityEditorRights  ||hasMaintenanceEditorRights ? <UpdateUser /> : <Navigate to="/" />,
            },
            {
                path: 'dashboard/configuration',
                element:hasElectricityEditorRights  ||hasMaintenanceEditorRights ? <Configuration /> : <Navigate to="/" />,
            },

       
           
        ]
    }
]