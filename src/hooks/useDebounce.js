import { useState,useEffect } from "react"

export const useDebounce = (value, delay) => {
    const [valueDebounce, setValueDebounce] = useState("")
    useEffect(() => {
      const handle = setTimeout(()=> {
        setValueDebounce(value)
      },delay) 
      return ()=>{
        clearTimeout(handle)
      }
    }, [value,delay]);
    return valueDebounce
}
