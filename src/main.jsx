import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import ErrorPage from './Pages/ErrorPage';
import MainLayout from './Layout/MainLayout';
import Dashboard from './components/Dashboard/Dashboard';
import MealEntry from './Pages/MealEntryForm/MealEntry';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Dashboard></Dashboard>
      },
      {
        path: '/add-meal',
        element: <MealEntry></MealEntry>
      }
    ]
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
