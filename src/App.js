import './App.css';
import { Header } from './components/Header/Header';
import { BlogContent } from './components/Blog/BlogContent';
import { Footer } from './components/Footer/Footer';
export function App() {
  return (
    <div className="App">
      <Header />
    <main>
      <BlogContent />
    </main>    
      <Footer year={new Date().getFullYear()}/>  
    </div>
  );
}


