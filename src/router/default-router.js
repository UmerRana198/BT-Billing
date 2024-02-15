import React from 'react'
import Index from '../views/dashboard/index'
import Customer from '../views/dashboard/special-pages/Customer/AddCustomer'
import Default from '../layouts/dashboard/default';
import ViewCustomer from '../views/dashboard/special-pages/Customer/ViewCustomer';
import Cookies from "js-cookie";
import { Navigate } from 'react-router-dom'; 

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

                path: 'dashboard/Home/Customer',
                element: Email ? <Customer /> : <Navigate to="/" />,
            },{
                path: 'dashboard/Home/ViewCustomer',
                element:  Email ? <ViewCustomer /> : <Navigate to="/" />,
            },
           
            

           
        ]
    }
]