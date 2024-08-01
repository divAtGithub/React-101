import { useEffect } from "react";
import { useState } from "react"

function PasswordGenerator() {

  const [password, setPassword] = useState("");
  const [length, setLength] = useState(6);
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [charactersAllowed, setCharactersAllowed] = useState(false);
  const [copyClicked, setCopyClicked] = useState(false);

  const generatePassword = ()=> {

    let allowed = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const characters = '~!@#$%^&*()_+-=';
    let password = '';

    if(numbersAllowed){
      allowed += numbers;
    }

    if(charactersAllowed){
      allowed += characters;
    }

    for(let i = 0; i< length; i++){
      let randomIndex = Math.floor(Math.random()*allowed.length);
      password += allowed.charAt(randomIndex);
    }

    setPassword(()=> password);
    setCopyClicked(false);
  }

  const copyPassword = ()=>{
    setCopyClicked(true);
    navigator.clipboard.writeText(password);
  }

  useEffect(() => {
    generatePassword();
  }, [length, numbersAllowed, charactersAllowed])
  

  return (
    <div className="w-full max-w-lg mx-auto my-8 shadow-md rounded-lg bg-gray-600 px-4 py-3 text-orange-500">
      
      <h1 className="text-white text-2xl text-center my-5">Password Generator</h1>

      <div className="flex rounded-lg overflow-hidden mb-4"> 
        <input
          type="text"
          value = {password}
          placeholder="Password"
          readOnly
          className="outline-none w-full text-xl px-4"
        /> 
        <button 
          className= {`outline-none px-4 py-2 transition-colors duration-300 ${copyClicked ? 'bg-green-600 text-white' : 'bg-blue-600 text-white' } `}  
          onClick={copyPassword}>
          {copyClicked ? 'Copied' : 'Copy'}
        </button>
      </div>

      <div className="flex w-full gap-10 text-md">

        <div className="flex gap-x-1">
            <input
              type="range"
              min={6}
              max={20}
              className="cursor-pointer"
              value={length}
              onChange={(e)=> setLength(e.target.value)}
            />
            <label>Length: {length}</label>
        </div>

        <div className="flex gap-x-1"> 
            <input
              type="checkbox"
              defaultChecked={numbersAllowed}
              id="numInput"
              onChange={() => setNumbersAllowed(prev => !prev)}
            />
            <label htmlFor="numInput">Numbers</label>
        </div>

        <div className="flex gap-x-1"> 
            <input
              type="checkbox"
              id="charInput"
              defaultChecked={charactersAllowed}
              onChange={() => {
                setCharactersAllowed((prev) => !prev)
              }}
            />
            <label htmlFor="charInput">Characters</label>
        </div>

      </div>
    </div>
  )
}

export default PasswordGenerator;