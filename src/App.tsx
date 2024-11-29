import { Route, Routes } from "react-router-dom"
import Home from "./components/home"
import Contacts from "./components/contacts"
import Layout from "./components/main/Layout"
import Character from "./components/character"
import ContactDataWrapper from "./components/contacts/_components/_ContactDataWrapper"
import { ToastContainer } from 'react-toastify';
function App() {

  return (
    <>
      <Layout>
        <Routes>
          <Route path="*" element={<div>Not Found</div>} />
          <Route path="/" element={<Home />} />
          <Route
            path="/contact/*"
            element={
              <ContactDataWrapper>
                <Routes>
                  <Route path="" element={<Contacts />} />
                  <Route path=":id" element={<Character />} />
                </Routes>
              </ContactDataWrapper>
            }
          />
        </Routes>
      </Layout>
      <ToastContainer />
    </>
  )
}

export default App
