import House from '../assets/Images/business-and-trade.png'
import {useAuth0} from "@auth0/auth0-react"
import { Link } from 'react-router-dom';

function Navbar() {
  const {loginWithRedirect , user , isAuthenticated, logout} = useAuth0();


  return (
    <div className="navbar bg-base-100 shadow-sm z-10">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li><Link to={"/"}>Home</Link></li>
        <li>
          <a>Parent</a>
          <ul className="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </li>
        <li><a>Contact Us</a></li>
      </ul>
    </div>
    <a className="btn btn-ghost text-xl flex items-baseline justify-center"><img src={House} alt="" className='w-7' />Basera</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><Link to={'/'}>Home</Link></li>
      <li>
        <details>
          <summary>Parent</summary>
          <ul className="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </details>
      </li>
      <li><Link>Contact Us</Link></li>
      <li><Link to={'/listings'}>Listings</Link></li>
      <li><Link to={'/postproperty'}>Post Property</Link></li>
    </ul>
  </div>
  <div className="navbar-end gap-2">
    {!isAuthenticated && (<><a className="btn bg-[#FFCC41]" onClick={() => loginWithRedirect()}>Login</a>
    <a className="btn bg-[#FFCC41]" onClick={()=> loginWithRedirect()}>Signup</a></>) }
  </div>
  { isAuthenticated && 
  <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={user.picture} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link className="justify-between" to={"/profile"}>
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><Link to={'/user-listing'}>Settings</Link></li>
        <li><Link onClick={()=> logout()}>Logout</Link></li>
      </ul>
    </div>
}
</div>
  )
}

export default Navbar