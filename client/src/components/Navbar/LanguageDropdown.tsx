import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./LanguageDropdown.scss"


const languages = [
   { code: "en", label: "🇬🇧" },
   { code: "ua", label: "🇺🇦" },
];

const LanguageDropdown = () => {
   const { i18n } = useTranslation();
   const [isOpen, setIsOpen] = useState(false);

   const changeLanguage = (lng: string) => {
      i18n.changeLanguage(lng);
      setIsOpen(false);
   };

   return (
      <div className="dropdown">
         <button onClick={() => setIsOpen(!isOpen)} className="dropdown-toggle">
            {languages.find((l) => l.code === i18n.language)?.label}
         </button>

         {isOpen && (
            <ul className="dropdown-menu">
               {languages.map((lang) => (
                  <li key={lang.code}>
                     <button onClick={() => changeLanguage(lang.code)}>{lang.label}</button>
                  </li>
               ))}
            </ul>
         )}

         <style>{`
        
      `}</style>
      </div>
   );
};

export default LanguageDropdown;
