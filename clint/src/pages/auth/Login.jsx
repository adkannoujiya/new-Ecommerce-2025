import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth";
import s from "../../AllCssFile/Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const location = useLocation();
  const [eror, setEror] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://new-ecommerce-2025-1.onrender.com/api/v1/auth/login",
        {
          email,
          password,
        }
      );

      if (res && res.data.success) {
        alert("Login successfully");
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else if (res && res.data.success == false) {
        setEror(res.data.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={s.loginPage}>
      <h1 className={s.title}>Login</h1>
      <form onSubmit={handleSubmit} className={s.form}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className={s.input}
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className={s.input}
        />

        <button type="submit" className={s.button}>
          Login
        </button>

        <button
          type="button"
          className={s.linkButton}
          onClick={() => navigate("/forgot-password")}
        >
          Forgot Password?
        </button>
        <h4 style={{ color: "red", marginLeft: "110px" }}>
          {eror ? eror : ""}
        </h4>
      </form>
    </div>
  );
};

export default Login;
