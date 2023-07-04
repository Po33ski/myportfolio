import React, { useState } from 'react';
import {auth, emailProvider, googleProvider} from '../../config/firebase';
import {signInWithPopup} from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import './Login.css';


interface LoginProps {
  handleLogin: () => void;
};


// This component handles the log in pop up
// On the project has been used google authentication
export const Login: React.FC<LoginProps> = ({ handleLogin }) => {

  const navigate = useNavigate();
  const signInWithGoogle = async () => {
      const result = await signInWithPopup(auth, googleProvider);
      handleLogin();
      navigate("/"); // redirection to home page (calculator)
  };

  const signInWithEmail = async () => {
    const result = await signInWithPopup(auth, emailProvider);
    handleLogin();
    navigate("/"); // redirection to home page (calculator)
  };
  return (
    <div className="login-container">
      <div className="login-card">
        <p>Sign In with Google To Continue</p>
        <div className="button-container">
          <button onClick={signInWithGoogle}>Sign In With Google</button>
        </div>

        <p>Sign In with your Email To Continue</p>
        <div className="button-container">
          <button onClick={signInWithEmail}>Sign In With Email</button>
        </div>
      </div>
    </div>
  );
};



/*
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
*/