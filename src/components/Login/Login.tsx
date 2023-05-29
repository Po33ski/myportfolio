import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';


// This is the simply Login component. It checks if the password and ID is correct. 
// The credentials has been added in the code. It is only for demostration
interface LoginProps {
  handleLogin: () => void;
};

const Login: React.FC<LoginProps> = ({ handleLogin }) => {
  const [userID, setUserID] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate user credentials
    if (userID === 'User123' && password === 'myPassword') {
      handleLogin();
      navigate('/');
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Full Name..."
        value={userID}
        onChange={(e) => setUserID(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password..."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input type="submit" value="Login" />
    </form>
  );
};

export default Login;
