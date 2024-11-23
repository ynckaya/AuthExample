import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./actions/action";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import LoginForm from "./components/LoginForm"; // LoginForm bileşenini dahil ettik
import Dashboard from "./components/Dashboard";

// Kullanıcılar verileri (örnek)
const users = [
  { username: "admin", password: "1234", role: "admin" },
  { username: "user", password: "1234", role: "user" },
];

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  // Kullanıcı girişi işlemi
  const handleLogin = (username, password) => {
    const foundUser = users.find((user) => user.username === username && user.password === password);
    if (foundUser) {
      dispatch(login(foundUser)); // Redux'a kullanıcıyı kaydediyoruz
    } else {
      alert("Invalid credentials!");
    }
  };

  // Kullanıcıyı çıkartma işlemi
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Router>
      <div>
        {user ? (
          // Kullanıcı girişi yapılmışsa Dashboard gösteriliyor
          <div>
            <h2>Welcome, {user.username}!</h2>
            <button onClick={handleLogout}>Logout</button>
            <Switch>
              <Route path="/dashboard" component={Dashboard} />
              <Redirect from="/" to="/dashboard" />
            </Switch>
          </div>
        ) : (
          // Kullanıcı girişi yapılmamışsa sadece LoginForm gösteriliyor
          <div>
            <h2>Please login</h2>
            <Switch>
              {/* Eğer kullanıcı giriş yapmamışsa, LoginForm gösterilecek */}
              <Route path="/" render={() => <LoginForm onSubmit={handleLogin} />} />
              <Redirect from="*" to="/" />
            </Switch>
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;
