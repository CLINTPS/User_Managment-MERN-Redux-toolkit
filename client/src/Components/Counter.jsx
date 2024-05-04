import React, { useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {increment,decrement} from '../redux/features/userSlice'

const Counter = () => {
    const count = useSelector((state)=>state.user.userCounter)
    const dispatch = useDispatch()
    const [initial,setIntial]=useState(null)

    const handleIncrement=()=>{
        // clearInterval(initial)
        // const id = setInterval(() => {
            dispatch(increment())
        // }, 100);
        // setIntial(id)
    }
    const handleDecrement=()=>{
        // clearInterval(initial)
        // const id = setInterval(() => {
            dispatch(decrement())
        // }, 100);
        // setIntial(id)
    }

  return (
    <div>
      <h1 style={{color:"white"}}>Counter :{count}</h1>
      <button className='bg-red-600 px-1 py-1 rounded mr-2 mt-3 hover:text-white hover:bg-red-800' onClick={handleDecrement}>decrement</button>
      <button className='bg-green-600 px-1 py-1 rounded hover:text-white hover:bg-green-800' onClick={handleIncrement}>increment</button>
    </div>
  )
}

export default Counter
