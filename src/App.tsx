import { Route, Routes } from "react-router-dom"
import Home from "./components/home"
import Contacts from "./components/contacts"

function App() {

  return (
    <>
      <Routes>
      <Route path="*" element={<div>Not Found</div>} />

        <Route path="/" element={<Home />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>
    </>
  )
}

export default App
