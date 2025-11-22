import React, { useEffect, useState } from 'react'
import '../CounterTimer.css'
import { useRef } from 'react';

const CounterTimer = () => {
    const [time,setTime]=useState(0);
    const [active,setActive]=useState(false);
    const [isPause,setPause]=useState(false);
    const intervalRef=useRef(null);

    const handleInput=(event)=>{
        setTime(parseInt(event.target.value*60));
    }

    const formatTime=()=>{
           const min=String(Math.floor(time/60)).padStart(2,'0');
           const sec=String(time%60).padStart(2,'0');
           console.log(min);
           console.log(sec);
           return `${min} : ${sec}`

    }
    const handleStart=()=>{
        setActive(true)
        setPause(false)
    }
    useEffect(()=>{
                if(active && !isPause && time >0){

                     intervalRef.current = setInterval(()=>{
                        setTime((prev)=>prev-1)
                    },1000)
                }

                else if (time==0){
                    clearInterval(intervalRef.current);
                    setActive(false);
                    alert("Your time is up");
                }

                return()=>clearInterval(intervalRef.current);
    },[active,isPause,time])

    const hadlePause=()=>{
           setPause(!isPause)
    }

    const handleReset=()=>{
               clearInterval(intervalRef.current);
               setActive(false);
               setPause(false);
               setTime(0);
    }


  return (
    <div className='countdown-timer'>
        <h1>Countdown Timer...</h1>
        <div>
            <input className='timer-display' placeholder='Enter Time In minuts' type='number'
            onChange={handleInput}            
            ></input>
        </div>
              <div>{formatTime()}</div>
        <div className='timer-controls'>
            <button onClick={handleStart} disabled={active && !isPause}>Start</button>
            <button onClick={hadlePause} disabled={!active}>{isPause ? 'Resume' : 'Pause'}</button>
            <button onClick={handleReset}>Reset</button>
        </div>
   
    </div>
  )
}

export default CounterTimer

