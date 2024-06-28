import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
// import { userServices } from '../../services/userServices';
// import { useNavigate } from 'react-router-dom';



export const Contact = () => {
    const [contact, setContact] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    })

    const updateInput = e => {
        const { name, value } = e.target

        setContact(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // customersController.contact(contact)
    }

    return (<>
        <h1>Contact</h1>
        <Form onSubmit={handleSubmit}>
                <Row className='form'>
                    <Form.Group as={Col}>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control 
                            type='text' 
                            placeholder='First Name' 
                            name='firstName'
                            value={contact.firstName}
                            onChange={updateInput}
                        />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control 
                            type='text' 
                            placeholder='Last Name'
                            name='lastName'
                            value={contact.lastName}
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
                        value={contact.email}
                        onChange={updateInput}
                    /> 
                </Form.Group>
                <Row className='form'>
                    <Form.Group as={Col}>
                        <Form.Label>Message</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3} 
                            placeholder='message' 
                            name='message'
                            value={contact.message}
                            onChange={updateInput}
                        />
                    </Form.Group>
                </Row>
                <Button type='submit' className='form'>
                    Submit
                </Button>
            </Form>
    </>)
}