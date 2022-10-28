import { useStore } from "effector-react";
import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import { AuthPage } from "./components/AuthPage/AuthPage";
import { Header } from "./components/Header/Header";
import { $auth } from "./context/auth";

function App() {
  const isLoggedIn = useStore($auth);

  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={isLoggedIn ? <Navigate to='/costs' /> : <Navigate to="login" />} />
          <Route path="/registration" element={isLoggedIn ? <Navigate to='/costs' /> : <AuthPage type={"registration"} />} />
          <Route path="/login" element={isLoggedIn ? <Navigate to='/costs' /> : <AuthPage type={"login"} />} />
          <Route path="/costs" element={isLoggedIn ? <h1>Costs</h1> : <Navigate to='/login' />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
