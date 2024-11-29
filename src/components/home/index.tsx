import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <div className="flex flex-col">
        <div><Link to="/contacts">Contacts</Link></div>
        <div><Link to="/chracter">Chracter</Link></div>
      </div>
    </div>
  )
}

export default Home