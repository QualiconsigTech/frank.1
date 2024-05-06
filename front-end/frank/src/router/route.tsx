import { createBrowserRouter, Navigate } from "react-router-dom";
import  { jwtDecode } from 'jwt-decode'; 
import App from '../App';
import Login from "./pages/Login";
import GetExtract from "./pages/PuxaExtrato";
import AdminPage from "./pages/Admin";
import { AdmCreated } from "./pages/amdCreate";


const PrivateRoute = ({ element, path }: any) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decodedToken: any = jwtDecode(token);
    localStorage.setItem('username', decodedToken.userIsInDatabase.username)
    localStorage.setItem('office', decodedToken.userIsInDatabase.officeId)
    localStorage.setItem('credits', decodedToken.office.credits)
    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken.exp < currentTime) {
      return <Navigate to="/login" replace />;
    }

    return <>{element}</>;
  } catch (error) {
    console.error('Erro ao decodificar o token:', error);
    return <Navigate to="/login" replace />;
  }
};

const AdmPrivateRoute = ({element, path}:any) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const decodedToken: any = jwtDecode(token);
  const office = localStorage.getItem("office");
  if(office == '3') {
    return <>{element}</>
  } else {
    return <Navigate to="/login" replace />;
  }
  
}

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
    element: <PrivateRoute element={<GetExtract />} />
  },
  {
    path: "/admin",
    element: <AdmPrivateRoute element={<AdminPage />}/>
  },
  {
    path: "/admin/create",
    element: <AdmPrivateRoute element={<AdmCreated/>} />
  }
]);
