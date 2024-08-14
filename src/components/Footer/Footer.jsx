import { useContext } from 'react';
import { ChangeThemeContext } from '../../App'; // Путь может отличаться
import f from './styles.module.css';

function Footer() {
    const { isDarkMode } = useContext(ChangeThemeContext);

    return (
        <div className={`${f.footers} ${isDarkMode ? f.darkTheme : f.lightTheme}`}>
            <a href="http://localhost:3000/?" className={f.footer__logo}><span>My</span>App</a>
        </div>
    );
}

export default Footer;
