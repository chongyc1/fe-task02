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
              // Initially, I planned to use <ContactDataWrapper> to store all the data within the Provider.
              // However - Plan B, I decided to use hooks instead.
              // However, 'selectedCharacter' is still in use for sharing across components, 
              // can refer to the active contact in <ContactRow>          
              <ContactDataWrapper>
                <Routes>
                  <Route path="" element={<Contacts />} />
                  <Route path=":id" element={<Character />} />
                </Routes>
              </ContactDataWrapper>
            }
          />
        </Routes>
      </Layout >
      <ToastContainer />
    </>
  )
}

export default App
