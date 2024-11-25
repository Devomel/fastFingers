import { BrowserRouter } from "react-router-dom"
import AppRouter from "./components/AppRouter"
import Navbar from "./components/Navbar/Navbar"
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
