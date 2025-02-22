import { FC } from 'react'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import "./Navbar.scss"
import LanguageDropdown from './LanguageDropdown';
import ThemeSwitcher from './ThemeSwitcher';



const Navbar: FC = () => {
   const { t } = useTranslation()
   return (
      <nav className='navbar'>
         <span>
            <Link to={'/menu'}>{t("menu")}</Link>
         </span>
         <div>
            <Link to={'/lesson'}>{t("practise")}</Link>
            <Link to={'/lesson'}>{t("test")}</Link>
            <Link to={'/profile'}>{t("profile")}</Link>
            <Link to={'/profile'}>{t("statistics")}</Link>

         </div>
         <span>
            <LanguageDropdown />
            <ThemeSwitcher />
         </span>
      </nav>
   )
}

export default Navbar;