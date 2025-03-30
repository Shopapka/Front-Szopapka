import React, { JSX } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/UserStuff/Login";
import Register from "./components/UserStuff/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Header from "./components/header/header";
import ShoppingList from "./components/ShoppingList/ShoppingList";
import Footer from "./components/footer/footer";
import ShopListItem from "./components/shop_list_item/shop_list_item";
import Account from "./components/account/Account"
import Faq from "./components/faq/faq";

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  return user ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
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
                <Faq />
              </ProtectedRoute>
            }
          />

          <Route
            path="/shoppinglist"
            element={
              <ProtectedRoute>
                <ShoppingList />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          ></Route>

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
