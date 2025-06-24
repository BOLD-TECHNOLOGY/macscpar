import { useState, useEffect } from "react";
import { AppContext } from "./AppContext";

export default function AppProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUser() {
      try {
        const res = await fetch("/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();

        if (res.ok) {
          setUser(data);
        } else {
          logout();
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        logout();
      }
    }

    if (token) {
      getUser();
    }
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  return (
    <AppContext.Provider value={{ 
      token, 
      setToken, 
      user, 
      setUser, 
      logout, 
      login 
    }}>
      {children}
    </AppContext.Provider>
  );
}