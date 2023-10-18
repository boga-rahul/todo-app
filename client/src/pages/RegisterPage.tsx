import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [username, setUsername] = useState("sds");
  const [email, setEmail] = useState("rb@gmail.com");
  const [password, setPassword] = useState("ds");
  const [rpassword, setRpassword] = useState("ds");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const submitForm = async () => {
    const formData = {
      username: username,
      email: email,
      password: password,
    };
    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        body: JSON.stringify(formData),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const content = await response.json();
      if (response.status == 200) {
        navigate("/login");
      } else {
        setError(content.message);
      }
    } catch (error) {
      setError(error as string);
    }
  };

  return (
    <div className="flex flex-col justify-center w-[350px] p-8 gap-4 border shadow-lg rounded-xl bg-white">
      <div className="flex flex-col items-center gap-2 mb-4">
        <h1 className="font-extrabold text-lg">Create your new account</h1>
        <p className="opacity-[0.5] text-xs">
          Enter in your details below to get started
        </p>
      </div>
      <span
        hidden={error.length == 0}
        className="text-white bg-red-500 w-full p-1"
      >
        {error}
      </span>
      <div className="flex flex-col gap-1 text-[11px]">
        <label htmlFor="username">Username</label>
        <input
          className="border-2 rounded-md p-2 h-8 focus:outline-none focus:border-2 focus:border-blue-800"
          type="text"
          name="username"
          id="username"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
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
      <div className="flex flex-col gap-1 text-[11px]">
        <label htmlFor="repassword">Repeat Password</label>
        <input
          className="border-2 rounded-md p-2 h-8 focus:outline-none focus:border-2 focus:border-blue-800"
          type="password"
          name="repassword"
          id="repassword"
          placeholder="Enter repeat password"
          value={rpassword}
          onChange={(e) => setRpassword(e.target.value)}
        />
      </div>
      <button
        className="w-full bg-blue-600 p-2 font-bold text-white rounded-md text-[11px]"
        type="button"
        onClick={submitForm}
      >
        Create Account
      </button>
      <p className="text-center w-full text-[11px]">
        Already have an account?{" "}
        <a href="#" className="underline text-blue-700">
          Sign in
        </a>
      </p>
    </div>
  );
}
