import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import ViewTimeTable from './components/ViewTimeTable.jsx';
import ErrorBoundaryTT from './components/ErrorBoundaryTT.jsx';

const router= createBrowserRouter([
    {
        path: "/*",
        element: <App />,
    },
    {
        path: "/tt/:id",
        element:<ViewTimeTable />,
        errorElement:<ErrorBoundaryTT/>
    }
])


ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
