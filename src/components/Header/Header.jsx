import { useContext, useEffect } from 'react';
import { ChangeThemeContext } from '../../App';
import h from './styles.module.css';

export function Header() {
  const { isDarkMode, setIsDarkMode } = useContext(ChangeThemeContext);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, [setIsDarkMode]);

  return (
    <header className={`${h.header} ${isDarkMode ? h.darkTheme : h.lightTheme}`}>
      <a href="#" className={h.logo}>типоTinder</a>
      <nav className={h.nav}>
        <a href="#">Home</a>
        <a href="#">About</a>
        <div className={h.themeSwitcher}>
          <span className={`${h.icon} ${h.sun}`}>☀️</span>
          <label className={h.switch}>
            <input type="checkbox" checked={isDarkMode} onChange={toggleTheme} />
            <span className={h.slider}></span>
          </label>
          <span className={`${h.icon} ${h.moon}`}>🌙</span>
        </div>
      </nav>
    </header>
  );
}

export default Header;




