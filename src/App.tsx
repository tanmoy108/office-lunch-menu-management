import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home";
import AddDish from "./pages/addDish/AddDish";
import Login from "./pages/auth/login/Login";
import SignUp from "./pages/auth/signUp/SignUp";
import Verify from "./pages/auth/verify/Verify";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="addmenu" element={<AddDish />} />
          {/* <Route path="contact" element={<Contact />} /> */}
          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>

        <Route path="auth/login" element={<Login />} />
        <Route path="auth/signup" element={<SignUp />} />
        <Route path="auth/check" element={<Verify />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
