import { useTheme } from "../../context/ThemeProvider";


const ThemeSwitcher = () => {
   const { isDarkMode, toggleTheme } = useTheme()
   return (
      <button onClick={() => toggleTheme()}>
         {isDarkMode ? "🌙" : "🌕"}
      </button>
   )
}

export default ThemeSwitcher;