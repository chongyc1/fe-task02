import Layout from "./components/main/Layout"
import { ToastContainer } from 'react-toastify';
import Router from "./Router"
function App() {

  return (
    <>
      <Layout>
        <Router />
      </Layout >
      <ToastContainer />
    </>
  )
}

export default App
