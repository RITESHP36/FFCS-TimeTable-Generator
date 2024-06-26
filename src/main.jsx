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

const router= createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/tt/:id",
        element:(
            <div>
                <h1>TimeTable</h1>
            </div>
        ),
    }
])


ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
