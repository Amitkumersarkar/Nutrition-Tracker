import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import ErrorPage from './Pages/ErrorPage/ErrorPage';
import MainLayout from './Layout/MainLayout';
import Dashboard from './components/Dashboard/Dashboard';
import MealEntry from './Pages/MealEntryForm/MealEntry';
import PresentMeal from './Pages/PresentMeal/PresentMeal';
import BmiCalculator from './Pages/BMI/BmiCalculator';
import MealPlan from './Pages/MealPlan/MealPlan';

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
        path: '/user-info',
        element: <MealEntry></MealEntry>
      },
      {
        path: '/present-meal',
        element: <PresentMeal></PresentMeal>
      },
      {
        path: '/bmi-calculator',
        element: <BmiCalculator></BmiCalculator>
      },
      {
        path: '/meal-plan',
        element: <MealPlan></MealPlan>
      }
    ]
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
