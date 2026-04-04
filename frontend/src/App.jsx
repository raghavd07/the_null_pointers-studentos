import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("studentos_user");
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        localStorage.removeItem("studentos_user");
      }
    }
  }, []);

  const handleLogin = (userData) => {
    localStorage.setItem("studentos_user", JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("studentos_user");
    setUser(null);
  };

  return user ? (
    <Dashboard user={user} onLogout={handleLogout} />
  ) : (
    <Login onLogin={handleLogin} />
  );
}