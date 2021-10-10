import { useState } from "react"
import styles from "./LoginPage.module.css"

export function LoginPage  ( {setIsLoggedIn, history, setUserName} ) 
{
    const [login, setLogin] =useState('');
    const [password, setPassword] =useState('');
    
    function handleLoginChange(e)
    {
      setLogin (e.target.value) 
    }
    
    function handlePasswordChange(e)
    {
      setPassword (e.target.value) 
    }

    const handleLogIn = (e) =>
    {
      e.preventDefault()
      localStorage.setItem('isLoggedIn', true)
      localStorage.setItem('userName', login)
      setUserName(login)
      setIsLoggedIn(true)
      history.push('/blog')
    }
    
    return (
      <form className={styles.loginForm} onSubmit={handleLogIn}>
        <h2>Please login</h2>
        <div>
          <input
            className={styles.loginFormInput}
            type="text"
            placeholder="Login"
            onChange={handleLoginChange}
            required
          />
        </div>
        <div>
          <input
            className={styles.loginFormInput}
            type="password"
            placeholder="Password"
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div>
          <button className={styles.blackBtn} type="submit">
            Enter
          </button>
        </div>
      </form>
    ); 
 }