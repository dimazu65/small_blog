import styles from "./LoginPage.module.css"

export function LoginPage (props)
{
    function handleLogIn(e)
    {
      e.preventDefault()
      props.history.push('/')
    }
    
    return (
      <form className={styles.loginForm} onSubmit={handleLogIn}>
        <h2>Please login</h2>
        <div>
          <input
            className={styles.loginFormInput}
            type="text"
            placeholder="Login"
            required
          />
        </div>
        <div>
          <input
            className={styles.loginFormInput}
            type="password"
            placeholder="Password"
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