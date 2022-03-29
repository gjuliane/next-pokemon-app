import {useState, useEffect} from 'react';
import styles from './SimpleForm.module.css';
import { Card } from '@nextui-org/react';

export const SimpleForm = () => {
    const [formState, setFormState] = useState({
        name: '',
        email: ''
    });
    const {name, email} = formState;
    
    // Solo hace el efecto en la carga original, didMount
    useEffect( () => {
        console.log('hey! primer carga');
    }, []);
    
    // cambio en el objecto de estado
    useEffect( () => {
        console.log('forState cambió');
    }, [formState]);

    // solo hace el efecto cuando name cambia
    useEffect( () => {
        console.log('name cambió');
    }, [name]);
    
    // solo hace el efecto cuando email cambia
    useEffect( () => {
        console.log('email cambió');
    }, [email]);
    
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState(
            {
                ...formState,
                [e.target.name]: e.target.value
            }
        )
    }
    return (
        <div className={styles.margin}>
        <Card>
            <Card.Body>
                <h3>useEffect</h3>
                <hr></hr>
                <div className='form-group'>
                    <input
                        type="text"
                        name='name'
                        className={styles.input}
                        placeholder='Tu nombre'
                        autoComplete='off'
                        value={name}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name='email'
                        className={styles.input}
                        placeholder='email@gmail.com'
                        autoComplete='off'
                        value={email}
                        onChange={handleInputChange}
                    />
                </div>
            </Card.Body>
        </Card>
    </div>
    )
}
