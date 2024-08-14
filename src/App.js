import logo from './logo.svg';
import './App.css';
import Footer from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Users } from './components/Users/Users';
import { createContext, useState, useEffect } from 'react';

export const ChangeThemeContext = createContext();

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <div className={isDarkMode ? 'dark-theme' : 'light-theme'}>
      <ChangeThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
        <Header />
        <div className='mainContent'>
          <Users />
        </div>
        <Footer />
      </ChangeThemeContext.Provider>
    </div>
  );
}

export default App;

