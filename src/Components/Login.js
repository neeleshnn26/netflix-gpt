import React, { useState } from 'react';
import Header from './Header';
import Browse from './Browse';

const  Login = () => {
  
  const[isSignInForm,setIsSignInForm]=useState(true);
  const toggleSignInform=()=>{
        setIsSignInForm(!isSignInForm);
  }


  return (
    <div>
    <Header/>
    <div className="absolute">
   
      <img src="https://assets.nflxext.com/ffe/siteui/vlv3/b2c3e95b-b7b5-4bb7-a883-f4bfc7472fb7/19fc1a4c-82db-4481-ad08-3a1dffbb8c39/IN-en-20240805-POP_SIGNUP_TWO_WEEKS-perspective_WEB_24a485f6-1820-42be-9b60-1b066f1eb869_large.jpg"
      alt="logo"/>

    </div>
                 {/* -------------------------sign in ,  sign up Form ---------------------------------------- */}

    <form className="absolute w-3/12 p-12 my-40 mx-auto right-0 left-0 text-white bg-black bg-opacity-75 rounded-s" >

      <h1 className="font-bold text-3xl py-4">{isSignInForm ? "Sign In" : "Sign up" }</h1>

      { !isSignInForm && (

      <input type="text" placeholder="Full Name" 
      className="p-3  my-5 w-full rounded-sm bg-gray-600 opacity-90 "
      />
      )}

      <input type="text" placeholder="Email or mobile number" 
      className="p-3  my-5 w-full rounded-sm bg-gray-600 opacity-90 "
      />

      <input type="password" placeholder="password" 
      className="p-3 my-3 w-full rounded-sm  bg-gray-600 opacity-90"
      />

      <button className="px-6 py-3  my-4 bg-red-700 w-full rounded-md">
        {isSignInForm ? "Sign in" : "Sign up"}
      </button>
     
      <p className="my-6 mx-10 cursor-pointer" onClick={toggleSignInform} >
        New to Netflix ? sign up now
      </p>
     
    </form>

  

    <Browse/>

    </div>
  )
}

export default  Login
