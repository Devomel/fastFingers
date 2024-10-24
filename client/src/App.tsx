import { BrowserRouter } from "react-router-dom"
import AppRouter from "./components/AppRouter"
import Container from "./UI/container/Container"
import "./styles/reset.css"
function App() {
  return (
    <>
      <BrowserRouter>
        <Container>
          <AppRouter />
        </Container>
      </BrowserRouter>
    </>
  )
}

export default App
