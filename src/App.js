import styles from "./App.module.css";
import { Header } from "./components/Header/Header";
import { BlogPage } from "./containers/BlogPage/BlogPage";
//import { LoginPage } from "./containers/LoginPage/LoginPage";
import { Login } from "./containers/Login/Login";
import { Register } from "./containers/Login/Register";
import { Reset } from "./containers/Login/Reset";
import { Footer } from "./components/Footer/Footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState } from "react";
import NotFoundPage from "./NotFoundPage";

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
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/reset" component={Reset} />
            <Route exact path="/blog" component={BlogPage} />

            <Route path="*">
              <NotFoundPage />
            </Route>   
            
          </Switch>
        </main>
        <Footer year={new Date().getFullYear()} />
        
      </div>
    </Router>
  );
}
