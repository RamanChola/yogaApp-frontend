import React from "react";
import { AuthContext } from "./Auth/auth-context";
import { useAuth } from "./hooks/auth-hook";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./Homepage/Homepage";
import Auth from "./Auth/Auth";
import NoPage from "./NotFound/NoPage";

const App = () => {
  const { isLoggedIn, token, login, logout, userId, username } = useAuth();
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        userId: userId,
        username: username,
        token: token,
        login: login,
        logout: logout,
      }}
    >
      <BrowserRouter>
        <Routes>
          {/* if the user is logged in, navigates to homepage otherwise to the login page*/}
          <Route
            path="/"
            element={isLoggedIn ? <Homepage /> : <Navigate to="/auth" />}
          />
          <Route
            path="/auth"
            element={isLoggedIn ? <Navigate to="/" /> : <Auth />}
          />
          {/* Default page for not Found path*/}
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
