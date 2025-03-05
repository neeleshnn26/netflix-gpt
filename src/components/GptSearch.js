import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'
import { BG_IMG } from '../utils/constants'

const GptSearch = () => {
  return (
    <div className="">
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <img
          src={BG_IMG}
          alt="background"
          className="w-full h-full object-cover"
        />
      </div>
     <GptSearchBar/>
     <GptMovieSuggestions/>
    </div>
  )
}

export default GptSearch
