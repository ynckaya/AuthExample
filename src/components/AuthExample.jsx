import { useState, useEffect } from "react";
import LoginForm from "./LoginForm";

const users = [
  { username: "admin", password: "1234", role: "admin" },
  { username: "user", password: "1234", role: "user" },
];

const AuthExample = ({ onLogin }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!onLogin) {
      console.warn("onLogin function is missing!");
    }
  }, [onLogin]);

  const login = (username, password) => {
    const foundUser = users.find((u) => u.username === username && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      onLogin && onLogin(foundUser.role); // Eğer onLogin varsa, çağrılır
    }
  };

  return <div>{!user ? <LoginForm onSubmit={login} /> : <p>Welcome, {user.role === "admin" ? "Admin" : "User"}!</p>}</div>;
};

export default AuthExample;
