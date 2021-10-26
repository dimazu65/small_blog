import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { auth, db, logout } from "../../containers/Login/firebase";

import { NavLink } from 'react-router-dom'
import styles from './Header.module.css'
import LogoutIcon from '@mui/icons-material/Logout';

export function Header () 
{

  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const history = useHistory();
  
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const query = await db
          .collection("users")
          .where("uid", "==", user?.uid)
          .get();
        const data = await query.docs[0].data();
        setName(data.name);
      } catch (err) {
        console.error(err);
        alert("An error occured while fetching user data");
      }
    };
    if (loading) return;
    if (!user) return history.replace("/");
    fetchUserName();
  }, [user, loading, history]);



    return (
      <header className={styles.mainHeader}>
        { (user) ? (
          <nav>
            Welcome, &nbsp; <strong> {name}</strong> 
            <NavLink
              onClick={logout}
              exact to="/"
            >
              <LogoutIcon />
              Logout
            </NavLink>
          </nav>)
        : (
          <nav>
          "Welcome Anonymous!!"
          </nav>
        )}

        
      </header>
    );
}