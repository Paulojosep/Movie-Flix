import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../AuthContext';
import history from '../../util/history';
import { getTokenData, isAuthenticated } from '../../util/auth';
import { removeAuthData } from '../../util/storage';
import './styles.css';
import { Link } from 'react-router-dom';

const NavBar = () => {
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

  const handleLogoutClick = () => {
    removeAuthData();
    setAuthContextData({
      authenticated: false,
    });
    history.replace('/');
  };

  const logout = () => {
    handleLogoutClick()
  }

  return (
    <nav className="bg-primary main-nav row">
      <div className="col-11">
        <Link to="/" className="nav-logo-text">
          <h4>MovieFlix</h4>
        </Link>
      </div>
      <div className="col-1">
        <div className="user-info-dnone text-right sair">
          {authContextData && (
            <>
              <button
                type="button"
                className="btn-out btn-outline-secondary btn"
                onClick={logout}
              >
                Sair
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
