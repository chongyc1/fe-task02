import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const NAV = [
  {
    name: "Home",
    path: '/',
  },
  {
    name: "Contacts",
    path: '/contact',
  },
]

const Navbar = () => {
  const location = useLocation();
  return (
    <div className="bg-gray-500 h-full flex flex-col items-center">
      <div>
        <h1 className="py-10 text-xl font-semibold">Rick and Morty</h1>
      </div>
      <div className="flex flex-col gap-y-10">
        {NAV.map((nav) => (
          <Link
            key={nav.path}
            className={`border rounded-md px-4 py-2 text-center 
              ${location.pathname === nav.path ? 'bg-gray-300 pointer-events-none' : ''}`
            } to={nav.path}
          >
            {nav.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Navbar;