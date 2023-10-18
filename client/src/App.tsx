import { Avatar } from "primereact/avatar";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-blue-100">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
      <Avatar
        size="large"
        className="absolute top-5 right-3"
        label="P"
        shape="circle"
        style={{
          backgroundColor: "#6366F1",
          color: "white",
        }}
      />
    </div>
  );
}

export default App;
