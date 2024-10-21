import React, { useEffect, useState, useCallback, useContext } from "react";
import { useRouter } from "next/router";
import decodeToken from "@/utils/jwtToken";

const authInitalContext = {
  token: "",
  isAuthenticated: false,
  userDetails: {},
  _authenticate: ({ userDetails = {}, accessToken = "" }) => {},
  _logout: () => {},
};

const AuthCTX = React.createContext(authInitalContext);

export default function AuthContextProvider(props) {
  const [token, setToken] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useRouter();

  const _logout = useCallback(() => {
    navigate.replace("/");

    localStorage.clear();
    setUserDetails(null);
    setToken(null);
    setIsAuthenticated(false);
  }, [navigate]);

  useEffect(() => {
    _authenticateOnRefresh();
  }, []);

  useEffect(() => {
    if (token && navigate.isReady) {
      const decodedToken = decodeToken(token);
      if (decodedToken) {
        const expirationTime = decodedToken.exp * 1000 - 60000; // 60 seconds before actual expiration
        const timeOutValue = expirationTime - Date.now();
        if (timeOutValue < 0) {
          _logout();
          return;
        }
        if (navigate.pathname === "/") {
          navigate.push("/dashboard");
        }
        const timer = setTimeout(() => {
          _logout();
        }, timeOutValue);

        return () => clearTimeout(timer);
      }
    }
  }, [token, navigate.isReady, navigate, _logout]);

  const _authenticateOnRefresh = useCallback(async () => {
    let accessToken = localStorage.getItem("accessToken");
    let userDetails = localStorage.getItem("userDetails");

    accessToken = accessToken ? JSON.parse(accessToken) : undefined;

    const decodedToken = decodeToken(accessToken);
    if (decodedToken) {
      const expirationTime = decodedToken.exp * 1000 - 60000; // 60 seconds before actual expiration
      const timeOutValue = expirationTime - Date.now();
      if (timeOutValue < 0) {
        _logout();
        return;
      }
    }

    if (accessToken && userDetails) {
      setToken(accessToken);
      setUserDetails(JSON.parse(userDetails));
      setIsAuthenticated(true);
    } else {
      setUserDetails(null);
      setIsAuthenticated(false);
      setToken(null);
      if (
        navigate.pathname !== "/" &&
        navigate.pathname !== "/login" &&
        navigate.pathname !== "/signup"
      ) {
        navigate.replace("/");
      }
    }
  }, [_logout]);

  const _authenticate = (data) => {
    const { userDetails, accessToken } = data;
    setUserDetails(userDetails);
    setIsAuthenticated(true);
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
    localStorage.setItem("accessToken", JSON.stringify(accessToken));
    navigate.replace("/dashboard");
  };

  return (
    <AuthCTX.Provider
      value={{
        token,
        userDetails,
        isAuthenticated,
        _authenticate,
        _logout,
      }}
    >
      {props.children}
    </AuthCTX.Provider>
  );
}

export const useAuthCtx = () => useContext(AuthCTX);
