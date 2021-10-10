import { NavLink } from 'react-router-dom'
import styles from './Header.module.css'
import LogoutIcon from '@mui/icons-material/Logout';

export function Header ({isLoggedIn, setIsLoggedIn, userName}) 
{
  function handleLogOut()
  {
    localStorage.setItem('isLoggedIn', false)
    setIsLoggedIn(false);

  }
    return (
      <header className={styles.mainHeader}>
        {isLoggedIn ? (
          <nav>
            Welcome, &nbsp; <strong> {userName}</strong> 
            <NavLink
              onClick={handleLogOut}
              exact
              to="/"
            >
              <LogoutIcon />
              Logout
            </NavLink>
          </nav>
        ) : (
          "Welcome Anonymous!!"
        )}
      </header>
    );
}