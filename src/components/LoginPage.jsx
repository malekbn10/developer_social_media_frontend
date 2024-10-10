import React, { useState } from 'react'
import loginImage from '../assets/images/login.png'
import { FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import axios from 'axios';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../constants/apiConstants';

export default function LoginPage() {
  const REACT_APP_SERVER_URL="http://localhost:8080/auth/login"

  const [state, setState] = useState({
    email: "",
    password: "",
    successMessage: null
  })
  const handleChange = (e) => {
    const { id, value } = e.target
    setState(prevState => ({
      ...prevState,
      [id]: value
    }))
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      "email": state.email,
      "password": state.password
    }
    axios.post(API_BASE_URL, payload)
      .then(function (response) {
        if (response === 200) {
          setState(prevState => ({
            ...prevState,
            "successMessage": 'Login successful. Redirecting to home page..'
          }))
          localStorage.setItem(REACT_APP_SERVER_URL, response.data.token);
          console.log(state.successMessage);
        } else if (response.code === 204) {
          console.log("Username and password do not match");
        }
        else {
          console.log("Username does not exists");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (

    <div className="container h-screen font-inter bg-gradient-to-r from-indigo-50 from-0% via-indigo-50 via-50% to-indigo-300 to-100%   flex flex-row justify-around items-center">
      <form className="loginForm flex flex-col items-center" >
        <div className='text-xl font-bold mb-5'>
          Welcome Back!
        </div>
        <label className='self-start ml-1' htmlFor="email">Email:</label>
        <input className='border border-indigo-500 mt-1 mb-4 border-solid bg-indigo-300 bg-opacity-0 outline-none min-w-[450px] min-h-[34px] rounded-[50px] focus:bg-opacity-25'
          type="email"
          name='email'
          id='email'
          value={state.email}
          onChange={handleChange}
        />
        <label className='self-start ml-1' htmlFor="password">Password:</label>
        <input className='border border-indigo-500 mt-1 mb-4 border-solid bg-indigo-300 bg-opacity-0 outline-none min-w-[450px] min-h-[34px] rounded-[50px] focus:bg-opacity-25 '
          type="password"
          name='password'
          id='password'
          value={state.password}
          onChange={handleChange} />
        <button type="submit"
          onClick={handleSubmit}
          className='px-16 py-2 mt-9 mb-4 w-full bg-indigo-500 text-indigo-50 rounded-[30px] text-base font-medium text-indigo-300 whitespace-nowrap'>Login</button>
        <p>Don't have an account ? <span className='font-medium'>Register</span></p>

        <div className="otherMethod mt-9 flex">
          <a><FaGithub className='fill-indigo-500  h-8 w-8 mr-3' /></a>
          <a><FaGoogle className='fill-indigo-500  h-8 w-8' /></a>
        </div>
      </form>
      <img className="h-auto max-w-lg " src={loginImage} alt="fff" />



    </div>



  )
}
