import React,{useState} from 'react'
import './SearchBar.css'


export const SearchBar = () => {

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  return (

    <div className={`search-bar ${isFocused ? 'focused' : ''}`}>
        <input
        type="text"
        placeholder="Search..."
        onFocus={handleFocus}
        onBlur={handleBlur}
        />
        <button>Search</button>
    </div>
    
  )
}
