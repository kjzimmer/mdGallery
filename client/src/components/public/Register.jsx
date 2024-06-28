import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { userServices } from '../../services/userServices';
import { useNavigate } from 'react-router-dom';

export function Register() {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    const updateInput = e => {
        const { name, value } = e.target

        setUser(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = e => {
        e.preventDefault()

        console.log(user)

        userServices.register(user)
        .then(res => navigate('/admin'))
        .catch(res => {
            console.log(res.response.data)
            setErrors(res.response.data.errors)
        })
    }

    return(
        <>
            <h1>Create an Account</h1>
            <Form onSubmit={handleSubmit}>
                <Row className='form'>
                    <Form.Group as={Col}>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control 
                            type='text' 
                            placeholder='First Name' 
                            name='firstName'
                            value={user.firstName}
                            onChange={updateInput}
                        />
                        <p>{errors.firstName}</p>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control 
                            type='text' 
                            placeholder='Last Name'
                            name='lastName'
                            value={user.lastName}
                            onChange={updateInput} 
                        />
                    </Form.Group>
                </Row>
                <Form.Group className='form'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        type='email' 
                        placeholder='Email'
                        name='email'
                        value={user.email}
                        onChange={updateInput}
                    /> 
                </Form.Group>
                <Row className='form'>
                    <Form.Group as={Col}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type='password' 
                            placeholder='Password' 
                            name='password'
                            value={user.password}
                            onChange={updateInput}
                        />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control 
                            type='password' 
                            placeholder='Confirm Password' 
                        />
                    </Form.Group>
                </Row>
                <Button type='submit' className='form'>
                    Submit
                </Button>
            </Form>
        </>
    )
}

