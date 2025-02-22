import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './App.tsx'
import { ThemeProvider } from './context/ThemeProvider.tsx'
import { store } from './store/store.ts'
import "./styles/App.css"

createRoot(document.getElementById('root')!).render(

   <Provider store={store}>
      <ThemeProvider>
         <App />
      </ThemeProvider>
   </Provider>

)
