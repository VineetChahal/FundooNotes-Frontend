//hooks,
import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';


export default function RoutingModule() {
    const routes = createBrowserRouter([
        {
            path: '',
            element: <Login/>

        },
        {
            path: 'signup',
            element: <SignUp/>
        }
    ]);
  return (
    <RouterProvider router={routes}/>
  )
}
