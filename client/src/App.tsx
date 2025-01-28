import { BrowserRouter } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import AppRouter from "./router/AppRouter"
import Container from "./UI/container/Container"

import "./styles/reset.css"
function App() {
   return (
      <>
         <BrowserRouter>
            <Container>
               <Navbar />
               <AppRouter />
            </Container>
         </BrowserRouter>
      </>
   )
}

export default App
