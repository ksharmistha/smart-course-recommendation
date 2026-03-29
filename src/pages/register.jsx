import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [data, setData] = useState({ username: "", password: "" });

  const handleRegister = async () => {
    await axios.post("http://localhost:5000/api/auth/register", data);
    alert("Registered!");
    window.location.href = "/";
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>✨ Register</h2>
      <input placeholder="Username" onChange={e => setData({...data, username: e.target.value})}/>
      <br/>
      <input type="password" placeholder="Password" onChange={e => setData({...data, password: e.target.value})}/>
      <br/>
      <button onClick={handleRegister}>Signup 💙</button>
    </div>
  );
}