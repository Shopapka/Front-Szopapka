import React, { JSX } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import ShopListItem from "./components/shop_list_item/shop_list_item";

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  return user ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <AuthProvider>
      
      <Router>
      <Header/>
        <Routes>
        
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/blog"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/grupy"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/faq"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
        <div className="test"><ShopListItem itemName='Piwo jasne Żywiec' quantity='5' state='0'/></div>
        <div className="test"><ShopListItem itemName='Piwo jasne Żywiec' quantity='5' state='1' buyerName='John' buyerSurname='Ligma' buyerID='0' currentUserID='1'/></div>
        <div className="test"><ShopListItem itemName='Piwo jasne Żywiec' quantity='5' state='2'/></div>
        <div className="test"><ShopListItem itemName='Piwo jasne Żywiec' quantity='5' state='1' buyerName='John' buyerSurname='Ligma' buyerID='0' currentUserID='0'/></div>
        <Footer/>
      </Router>
    </AuthProvider>
  );
};

export default App;
