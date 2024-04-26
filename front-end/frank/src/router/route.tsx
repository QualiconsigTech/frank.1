import { createBrowserRouter } from "react-router-dom";
import App from '../App'
import Login from "./pages/Login";
import GetExtract from "./pages/PuxaExtrato";
import AdminPage from "./pages/Admin";

export const router = createBrowserRouter([
  {
    path: "/",
    element:<App/> 
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/puxaEx",
    element: <GetExtract/>
  },
  {
    path: "/admin",
    element: <AdminPage/>
  }
]);