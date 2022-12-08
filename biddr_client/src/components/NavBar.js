import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import axios from 'axios'

const NavBar = ({user, logUserOut}) => {

  const handleClick =()=>{
    axios.delete("http://localhost:3000/session", { withCredentials: true })
      .then(res => {
        if(res.data.logged_out) {
          console.log(res)
          logUserOut()
        }
      })
  }

  return (
    
    <nav className="d-flex justify-content-between align-items-center p-0">
        
        <div>
            <NavLink className="m-2 text-decoration-none text-dark" to="/">Home</NavLink>
            <NavLink className="m-2 text-decoration-none text-dark" to="/auctions">Auctions</NavLink>
            
            { !user && <NavLink className="m-2 text-decoration-none text-dark" to="/sign_in">Sign In</NavLink>}
            <span> </span>
            { !user && <NavLink className="m-2 text-decoration-none text-dark" to="/sign_up">Sign Up</NavLink>}
            { user && <NavLink className="m-2 text-decoration-none text-dark" to="/auctions/new">Create New Auction</NavLink>}
            <span> </span>
            { user && <span> Hi, {user.name} </span>}
            <span> </span>
            { user && <button className='btn btn-primary m-3' onClick={()=>{handleClick()}}>Logout</button>} 
            </div>
        </nav>
    
  )
}

export default NavBar