import { lazy , Suspense } from 'react'
import './App.css'

import LoadingPage from './components/LoadingPage'
import Root from './pages/Root.jsx'
import Error from './pages/Error.jsx'
import Home from './pages/Home.jsx'

import { RouterProvider,createHashRouter } from "react-router-dom";

const Income = lazy(() => import("./pages/Income"));
const Expense = lazy(() => import("./pages/Expense"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const About = lazy(() => import("./pages/About"));
const Investment = lazy(() => import("./pages/Investment"));
const Settings = lazy(() => import("./pages/Settings"));

const router = createHashRouter([
  {
    basename:"/Advanced-Finance-Manager",
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "income",
        element: <Suspense fallback={<LoadingPage />}><Income /></Suspense>,
      },
      {
        path: "expense",
        element: <Suspense fallback={<LoadingPage />}><Expense /></Suspense>,
      },
      {
        path: "investment",
        element: <Suspense fallback={<LoadingPage />}><Investment /></Suspense>,
      },
      {
        path: "dashboard",
        element: <Suspense fallback={<LoadingPage />}><Dashboard /></Suspense>,
      },
      {
        path: "about",
        element: <Suspense fallback={<LoadingPage />}><About /></Suspense>,
      },
      {
        path: "settings",
        element: <Suspense fallback={<LoadingPage />}><Settings /></Suspense>,
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} basename='/Advanced-Finance-Manager/' />
    </div>
  )
}

export default App
