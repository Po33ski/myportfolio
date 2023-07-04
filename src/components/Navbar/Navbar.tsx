import React from 'react';
import { Link } from 'react-router-dom';
import {auth} from "../../config/firebase";
import {useAuthState} from 'react-firebase-hooks/auth';  // npm install react-firebase-hooks
import {signOut} from "firebase/auth";
import './Navbar.css';

interface LoginProps {
  handleLogOut: () => void;
};
// This is the Navbar components
// It represents navbar of the page
// This returns navbar with properly pages
export const Navbar: React.FC<LoginProps> = ({ handleLogOut }) => {
   //It gives the information about  user
   const [user] = useAuthState(auth);
   // This funtion uses the other funtion sigOut from firebase
   const signUserOut = async () => {
      handleLogOut();
      await signOut(auth);
   };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/calculator">Calories Calulator</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/create-diet">Create Diet</Link>
        </li>
        <li>
          <Link to="/my-diets">Show Diets</Link>
        </li>
        <div className="user">
                  {user && (
                  <>
                      <p> {user?.displayName} </p>
                      <img src={user?.photoURL || ""} width="20" height="20"/>
                      <button onClick={signUserOut}> Log Out</button>
                  </>
                  )}
        </div>
      </ul>
    </nav>
  );
};
