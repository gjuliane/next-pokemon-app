import { Button } from '@nextui-org/react'
import React, { useState } from 'react'

export const CounterApp = () => {
  const [counter, setCounter] = useState(10) 
  return (
    <>
        <h2>Counter {counter}</h2>
        <hr/>
        <Button 
            color="gradient"
            animated
            onClick={ () => {
                setCounter(counter+1)
            }}
        >+1</Button>
    </>
  )
}
