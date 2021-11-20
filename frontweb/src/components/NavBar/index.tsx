import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../AuthContext';
import history from '../../util/history';
import { getTokenData, isAuthenticated } from '../../util/auth';
import { removeAuthData } from '../../util/storage';
import './styles.css';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  const { authContextData, setAuthContextData } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthContextData({
        authenticated: true,
        tokenData: getTokenData(),
      });
    } else {
      setAuthContextData({
        authenticated: false,
      });
    }
  }, [setAuthContextData]);

  return (
    <div className="navbar-container">
      <NavLink to="/" exact>
        <h2>MovieFlix</h2>
      </NavLink>
      <button className="navbar-login">
        { authContextData.authenticated ? (
            <span></span>
          ) : (
            <a href="/" onClick={removeAuthData}>SAIR</a>
          )}
      </button>
    </div>
  );
};

export default Navbar;
