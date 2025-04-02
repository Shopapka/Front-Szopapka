import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import "./Auth.css";
import { apiUrl } from "../../constants/url";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const registerToDatabase = async (email: string) => {
    const token = await auth.currentUser?.getIdToken();
    const response = await fetch(`${apiUrl}/registration/register`, {
      method: "POST",
      body: JSON.stringify({ mail: email }),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("serwer krzyczy ze nie jest ok :(");
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await registerToDatabase(email);
      await navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="register_main">
      <div className="auth-container">
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>Register</h2>
          {error && <p className="error">{error}</p>}
          <input
            maxLength={100}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            maxLength={100}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Register</button>
          <p className="switch">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
