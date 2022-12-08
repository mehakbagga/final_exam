import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const SignInPage = ({logInUser}) => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  let navigate = useNavigate()

  const handleSubmit = (event) => {
    axios
    .post(
        "http://localhost:3000/session", 
        {
            email,
            password
        }, 
        {withCredentials: true}
    )
    .then(res => {
        
        res.data.user && logInUser(res.data.user)
        navigate("/auctions", {replace: true})
    })
    .catch(err => {
        console.log("Login error", err)
    })
    console.log("form submitted")
    event.preventDefault();
  }

  const handleChange = (event) => {
    if(event.target.name==="email") setEmail(event.target.value)
    if(event.target.name==="password") setPassword(event.target.value)
  }

  return (
    <main className="d-flex justify-content-center m-4 p-5" >
             <div style={{width: "30em"}} className="my-auto col-sm-12 shadow p-3 mb-5 bg-white rounded my-auto col-sm-12">
            <h1 className="text-center m-2">Sign In</h1>
        <form onSubmit={handleSubmit}>

        <div className="form-group m-2">
            <label htmlFor="email">Email*</label>
            <input className="form-control"
                type="email" 
                name="email" 
                placeholder="Email" 
                value={email} 
                onChange={handleChange} 
                required 
            />
            </div>
            <div className="form-group m-2">
                    <label htmlFor="password">Password*</label>
            <input className="form-control"type="password" 
                name="password" 
                placeholder="Password" 
                value={password} 
                onChange={handleChange} 
                required 
            />
            </div>
            
            <button className='btn btn-primary m-2 mt-3' type="submit">Login</button>

        </form>
        </div>
    </main>
  )
}

export default SignInPage