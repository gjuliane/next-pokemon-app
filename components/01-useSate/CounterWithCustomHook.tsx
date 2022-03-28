import { Button, Card } from '@nextui-org/react'
import { useCounter } from '../../hooks'
import styles from './CounterApp.module.css'

export const CounterWithCustomHook = () => {

  const {state, increment, decrement, reset} = useCounter()

  const factor = 2

  return (
    <div className={styles.margin}>
        <Card>
            <Card.Body>
                <h3>Counter With Custom Hook: { state } </h3>
                <Button 
                    className={styles.margin}
                    color="gradient"
                    animated
                    onClick={ () => increment(factor) }
                >-{factor}</Button>
                <Button
                    className={styles.margin}
                    color="gradient"
                    animated
                    onClick={ () => decrement(factor) }
                >+{factor}</Button>
                <Button 
                    className={styles.margin}
                    color="gradient"
                    animated
                    onClick={ () => reset() }
                >Reset to original</Button>
            </Card.Body>
        </Card>
    </div>
  )
}
