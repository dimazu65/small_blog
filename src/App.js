import styles from './App.module.css';
import { Header } from './components/Header/Header';
import { BlogPage } from './containers/BlogPage/BlogPage';
import {LoginPage} from './containers/LoginPage/LoginPage';
import { Footer } from './components/Footer/Footer';
import { BrowserRouter  as Router, Route, Switch } from 'react-router-dom';

export function App() {
  return (
    <Router>
      <div className={styles.App}>
        <Header />
        <main>
          <Switch>
            <Route exact path="/" component ={BlogPage} />
            <Route path="/login" component ={LoginPage} />
          </Switch>
          
        </main>
        <Footer year={new Date().getFullYear()} />
      </div>
    </Router>
  );
}


