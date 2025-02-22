import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface ThemeContextType {
   isDarkMode: boolean;
   toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
   const context = useContext(ThemeContext);
   if (!context) {
      throw new Error("useTheme must be used within a ThemeProvider");
   }
   return context;
};

interface ThemeProviderProps {
   children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {

   const getInitialTheme = () => {
      const savedTheme = localStorage.getItem("theme");
      return savedTheme ? savedTheme === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
   };
   const [isDarkMode, setDarkMode] = useState<boolean>(getInitialTheme());

   const toggleTheme = () => {
      setDarkMode((prevMode) => {
         const newMode = !prevMode;
         localStorage.setItem("theme", newMode ? "dark" : "light");
         return newMode;
      });
   };

   useEffect(() => {
      document.documentElement.setAttribute("data-theme", isDarkMode ? "dark" : "light");
   }, [isDarkMode]);

   return (
      <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
         {children}
      </ThemeContext.Provider>
   )
}
