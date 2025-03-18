import "./App.css";

import Navigation from "./components/Navigation";

import { Outlet } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Footer from "./components/Footer";


function App() {
  return (
    <>
      <AuthProvider>
        <Navigation />
      
          <Outlet></Outlet>
      
        <Footer/>
      </AuthProvider>
    </>
  );
}

export default App;
