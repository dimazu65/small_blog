import styles from "./LoginPage.module.css"
export const LoginPage =()=>{
    return (
          <form className={styles.loginForm}>
              <h2>Please login</h2>
              <div>
                  <input className={styles.loginFormInput} type="text" placeholder="Login"/>

              </div>
              <div>
                  <input className={styles.loginFormInput} type="password" placeholder="Password"/>
                  
              </div>
              <div>
                  <button className={styles.blackBtn} type = "submit">Enter</button>
              </div>
          </form>
    ) 
 }