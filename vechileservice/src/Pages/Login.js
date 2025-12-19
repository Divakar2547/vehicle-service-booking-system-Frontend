import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI, authHelpers } from "../utils/api";
import "./../Styles/Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.login(formData);
      authHelpers.setToken(response.token);
      authHelpers.setUser(response.user);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <form className="loginForm" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
        <label>Email</label>
        <input 
          type="email" 
          name="email"
          placeholder="Email" 
          value={formData.email}
          onChange={handleChange}
          required 
        />
        <label>Password</label>
        <input 
          type="password" 
          name="password"
          placeholder="Password" 
          value={formData.password}
          onChange={handleChange}
          autoComplete="current-password"
          required 
        />
        <button className="loginButton" type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <div style={{ marginTop: '15px', textAlign: 'center' }}>
          <p>Demo: admin@example.com / admin123 or divakar@example.com / password123</p>
          <p>Don't have an account? <a href="/Register" style={{ color: '#007bff' }}>Sign up here</a></p>
        </div>
      </form>
    </div>
  );
};

export default Login;