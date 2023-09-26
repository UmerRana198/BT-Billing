import React from 'react'
import Index from '../views/dashboard/index'
// import { Switch, Route } from 'react-router-dom'

import Widgetbasic from '../views/dashboard/widget/widgetbasic';
import Widgetcard from '../views/dashboard/widget/widgetcard';
import Widgetchart from '../views/dashboard/widget/widgetchart';

// Form
import FormElement from '../views/dashboard/from/form-element';
import FormValidation from '../views/dashboard/from/form-validation';
import FormWizard from '../views/dashboard/from/form-wizard';


import Customer from '../views/dashboard/special-pages/AddCustomer'
import Admin from '../views/dashboard/admin/admin';
import Default from '../layouts/dashboard/default';
import ViewCustomer from '../views/dashboard/special-pages/ViewCustomer';




export const DefaultRouter = [
    {
        path: '/',
        element: <Default />,
        children: [
            {
                path: 'dashboard',
                element: <Index />
            },
            {
                path: 'dashboard/special-pages/Customer',
                element: <Customer />
            },{
                path: 'dashboard/special-pages/ViewCustomer',
                element: <ViewCustomer />
            },
           
        ]
    }
]