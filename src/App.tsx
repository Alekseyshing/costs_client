import { useStore } from "effector-react";
import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import { Alert } from "./components/Alert/Alert";
import { AuthPage } from "./components/AuthPage/AuthPage";
import { CostsPage } from "./components/CostsPage/CostsPage";
import { Header } from "./components/Header/Header";
import { $alert } from "./context/alert";
import { $auth } from "./context/auth";

function App() {
  const isLoggedIn = useStore($auth);
  const alert = useStore($alert);

  return (
    <div className="App">
      <Header />
      {alert.alertText && <Alert props={alert} />}
      <Router>
        <Routes>
          <Route path="/" element={isLoggedIn ? <Navigate to='/costs' /> : <Navigate to="login" />} />
          <Route path="/registration" element={isLoggedIn ? <Navigate to='/costs' /> : <AuthPage type={"registration"} />} />
          <Route path="/login" element={isLoggedIn ? <Navigate to='/costs' /> : <AuthPage type={"login"} />} />
          <Route path="/costs" element={isLoggedIn ? <CostsPage /> : <Navigate to='/login' />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
