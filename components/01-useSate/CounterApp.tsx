import { Button, Card } from '@nextui-org/react'
import { useState } from 'react'
import styles from './CounterApp.module.css'

export const CounterApp = () => {
  const [counter, setCounter] = useState(0) 
  return (
    <div className={styles.margin}>
        <Card>
            <Card.Body>
                <h4>Counter {counter}</h4>
                <hr/>
                <Button 
                    color="gradient"
                    animated
                    onClick={ () => {
                        setCounter(counter+1)
                    }}
                    className={styles.margin}
                    >+1</Button>
            </Card.Body>
        </Card>
    </div>
  )
}
