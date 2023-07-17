import "./App.css";

import {  Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { AuthContextProvider } from "./components/shared/AuthContext";

import ProtectedRoute from "./components/shared/ProtectedRoute";
import Register from "./components/register";
 
function App() {
  return (



    <>

      <AuthContextProvider>
        

        <Routes>
          
        
            <Route path="/" element={<Register />}></Route>
            <Route
              path="admin/login"
              element={
          
                <ProtectedRoute accessBy="non-authenticated">
                  <Login />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute accessBy="authenticated">
                  <Dashboard />
                </ProtectedRoute>
              }
              ></Route>
         
        
              </Routes>
              
      </AuthContextProvider>
    

                </>


  );
}
 
export default App;