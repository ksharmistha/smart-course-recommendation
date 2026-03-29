import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [data, setData] = useState({ username: "", password: "" });

  const handleLogin = async () => {
    const res = await axios.post("http://localhost:5000/api/auth/login", data);
    localStorage.setItem("token", res.data.token);
    window.location.href = "/dashboard";
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>🔐 Login</h2>
      <input placeholder="Username" onChange={e => setData({...data, username: e.target.value})}/>
      <br/>
      <input type="password" placeholder="Password" onChange={e => setData({...data, password: e.target.value})}/>
      <br/>
      <button onClick={handleLogin}>Login 🚀</button>
    </div>
  );
}