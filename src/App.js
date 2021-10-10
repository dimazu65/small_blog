import styles from "./App.module.css";
import { Header } from "./components/Header/Header";
import { BlogPage } from "./containers/BlogPage/BlogPage";
import { LoginPage } from "./containers/LoginPage/LoginPage";
import { Footer } from "./components/Footer/Footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState } from "react";

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  return (
    <Router>
      <div className={styles.App}>
        <Header
          userName={userName}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
        <main>
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <LoginPage
                  {...props}
                  setIsLoggedIn={setIsLoggedIn}
                  setUserName={setUserName}
                />
              )}
            />

            <Route exact path="/blog" component={BlogPage} />
            
          </Switch>
        </main>
        <Footer year={new Date().getFullYear()} />
      </div>
    </Router>
  );
}
