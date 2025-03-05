// import React, { useState ,useRef } from 'react'
// import Header from './Header'
// import { checkValidData } from '../utils/validate';
// import { createUserWithEmailAndPassword , signInWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { auth } from '../utils/firebase';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { addUser } from '../utils/userSlice';
// import { BG_IMG, USER_ICON } from '../utils/constants';

// const Login = () => {
//   const[isSignInForm,setIsSignInForm]=useState(true);
//   const[errorMessage,setErrorMessage]=useState(null);

//   const navigate=useNavigate()
//   const dispatch=useDispatch()
//   const name =useRef(null)
//   const email = useRef(null);
//   const password=useRef(null);

//   const handleButtonClick=()=>{
//   const message= checkValidData(email?.current?.value , password?.current?.value , name?.current?.value)
//   setErrorMessage(message)
//   if(message)return ;

//   if(!isSignInForm)
//   {
//     // Sign up logic 
//     createUserWithEmailAndPassword(auth, email?.current?.value , password?.current?.value)
//   .then((userCredential) => {
//     // Signed up 
//     const user = userCredential.user;
//     updateProfile(user, {
//       displayName: name.current.value, photoURL:USER_ICON
//     }).then(() => {
//       // Profile updated!
//       const {uid,email,displayName,photoURL}= user;
//           dispatch
//           (
//             addUser({
//             uid:uid,
//             email:email,
//             displayName:displayName,
//             photoURL:photoURL

//           })
//           )
//       navigate("/browse")
//     }).catch((error) => {
//       // An error occurred
//       setErrorMessage(error)
//     });
    
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//    setErrorMessage(errorCode + "-" + errorMessage)
//   });
//   }

  
//   else{
//     // Sign in logic
//     signInWithEmailAndPassword(auth, email?.current?.value , password?.current?.value)
//   .then((userCredential) => {
//     // Signed in 
//     const user = userCredential.user;
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     setErrorMessage(errorCode +"-"+errorMessage)
//   });
//   }


//   }
//   const toggleSignInForm=()=>{
//     setIsSignInForm(!isSignInForm)
//   }

//   return (
//     <div className="w-screen  ">
//       <Header/>

//      <div className="absolute">
//      <img 
//       className=""
//       src={BG_IMG}
//       alt="bg_img"
//       />
//      </div>
     
//       <form onSubmit={(e)=>e.preventDefault()} className="absolute bg-black  w-3/12 my-36 mx-auto right-0 left-0 px-8 py-10 rounded-md bg-opacity-85 text-white">
//         <h1 className="text-white text-4xl font-semibold mb-3">{isSignInForm ? "Sign In" : "Sign Up"}</h1>

//         {!isSignInForm &&(
//            <input 
//            ref={name}
//            className="px-3 py-4 rounded-md text-white w-full my-4 bg-gray-800"
//            type="text" placeholder="Full Name "
//            />
//         )}

//         <input 
//         ref={email}
//         className="px-3 py-4 rounded-md text-white w-full my-4 bg-gray-800"
//         type="text" placeholder="Email or mobile number "
//         />
//         <input 
//         ref={password}
//         className="px-3 py-4 rounded-md  w-full my-4 text-white bg-gray-800"
//         type="password" placeholder="Password"
//         />
//         <p 
//         className="font-bold text-red-800 py-2 text-lg"
//         >{errorMessage}
//         </p>

//         <button className="px-3 py-3 rounded-md bg-red-700 w-full my-4 text-white font-semibold" onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"} </button>
//         <p className="py-4 pl-1"
//         >{isSignInForm ? "New to Netflix ?" : "Already a user ?"} 
//         <button 
//         className="font-bold"
//         onClick={toggleSignInForm}
//         >{isSignInForm ? "Sign up now" : "Sign in now"}</button></p>
//       </form>
      

//     </div>
//   )
// }

// export default Login

import React, { useState, useRef } from 'react';
import Header from './Header';
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BG_IMG, USER_ICON } from '../utils/constants';

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = async () => {
    const message = checkValidData(email?.current?.value, password?.current?.value, name?.current?.value);
    setErrorMessage(message);
    if (message) return;

    try {
      if (!isSignInForm) {
        // Sign Up Logic
        const userCredential = await createUserWithEmailAndPassword(auth, email.current.value, password.current.value);
        const user = userCredential.user;

        await updateProfile(user, {
          displayName: name.current.value,
          photoURL: USER_ICON
        });

        dispatch(addUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL
        }));

        navigate("/browse");
      } else {
        // Sign In Logic
        await signInWithEmailAndPassword(auth, email.current.value, password.current.value);
        navigate("/browse");
      }
    } catch (error) {
      setErrorMessage(error.code + " - " + error.message);
    }
  };

  return (
    <div className="relative w-screen h-screen flex flex-col">
      <Header />
      
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <img className="w-full h-full object-cover" src={BG_IMG} alt="bg_img" />
      </div>

      {/* Form Container */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-85 text-white w-full max-w-[90%] md:w-3/12 px-6 py-8 md:px-10 md:py-12 rounded-md"
      >
        <h1 className="text-2xl md:text-4xl font-semibold mb-4">{isSignInForm ? "Sign In" : "Sign Up"}</h1>

        {!isSignInForm && (
          <input 
            ref={name}
            className="px-4 py-3 rounded-md text-white w-full my-2 bg-gray-800"
            type="text" 
            placeholder="Full Name"
          />
        )}

        <input 
          ref={email}
          className="px-4 py-3 rounded-md text-white w-full my-2 bg-gray-800"
          type="text" 
          placeholder="Email or mobile number"
        />
        <input 
          ref={password}
          className="px-4 py-3 rounded-md text-white w-full my-2 bg-gray-800"
          type="password" 
          placeholder="Password"
        />

        {errorMessage && <p className="text-red-500 text-sm py-2">{errorMessage}</p>}

        <button 
          className="w-full py-3 mt-4 bg-red-700 rounded-md text-lg font-semibold hover:bg-red-600"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p className="text-center text-sm mt-4">
          {isSignInForm ? "New to Netflix?" : "Already a user?"} 
          <button 
            className="text-red-500 font-bold ml-1"
            onClick={() => setIsSignInForm(!isSignInForm)}
          >
            {isSignInForm ? "Sign up now" : "Sign in now"}
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
