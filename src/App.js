import "./App.css";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Portfolio from "./Components/Portfolio";
import Transactions from "./Components/Transactions";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
          <Route
            path="/dashboard"
            exact
            element={
              JSON.parse(localStorage.getItem("token")) != null ? (
                <Dashboard />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/dashboard/portfolio"
            exact
            element={
              JSON.parse(localStorage.getItem("token")) != null ? (
                <Portfolio />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/dashboard/portfolio/transactions"
            exact
            element={
              JSON.parse(localStorage.getItem("token")) != null ? (
                <Transactions />
              ) : (
                <Login />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
