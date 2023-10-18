import React, { useState } from "react";
import { ErrorResponse, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("rb@gmail.com");
  const [password, setPassword] = useState("ds");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const submitForm = async () => {
    const formData = {
      email: email,
      password: password,
    };
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        body: JSON.stringify(formData),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const content = await response.json();
      if (response.status == 200) {
        localStorage.setItem("access-token", content.token);
        localStorage.setItem("email", email);
        navigate("/");
      } else {
        setError(content.message);
      }
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col justify-center w-[350px] p-8 gap-4 border shadow-lg rounded-xl bg-white">
      <div className="flex flex-col items-center gap-2 mb-4">
        <h1 className="font-extrabold text-lg">SignIn to your account</h1>
        <p className="opacity-[0.5] text-xs">Enter in your details below</p>
      </div>
      <span
        hidden={error.length == 0}
        className="text-white bg-red-500 w-full p-1"
      >
        {error}
      </span>
      <div className="flex flex-col gap-1 text-[11px]">
        <label htmlFor="email">Email</label>
        <input
          className="border-2 rounded-md p-2 h-8 focus:outline-none focus:border-2 focus:border-blue-800"
          type="text"
          name="email"
          id="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1 text-[11px]">
        <label htmlFor="password">Password</label>
        <input
          className="border-2 rounded-md p-2 h-8 focus:outline-none focus:border-2 focus:border-blue-800"
          type="password"
          name="password"
          id="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        className="w-full bg-blue-600 p-2 font-bold text-white rounded-md text-[11px]"
        type="button"
        onClick={submitForm}
      >
        Sign In
      </button>
      <p className="text-center w-full text-[11px]">
        Don't have an account?{" "}
        <a href="#" className="underline text-blue-700">
          Sign Up
        </a>
      </p>
    </div>
  );
}
