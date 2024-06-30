import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { userServices } from '../../services/userServices';
import { useNavigate, useParams } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';



export const ContactForm = () => {
    const { title, productVariation } = useParams()
    const [errors, setErrors] = useState({
        firstName: false,
        lastName: false,
        message: false,
        form: false
    })

    const [message, setMessage] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: '',
        product: title,
        productVariation: productVariation
    })
    const navigate = useNavigate()

    const updateInput = e => {
        const { name, value } = e.target

        setMessage(prev => ({ ...prev, [name]: value }))

        setErrors(prev => {
            let errors = { ...prev }

            const validation = {
                firstName: () => {
                    value.length < 3 ? errors.firstName = 'Must be at least 3 characters' : errors.firstName = true
                },
                lastName: () => {
                    value.length < 3 ? errors.lastName = 'Must be at least 3 characters' : errors.lastName = true
                },
                message: () => {
                    value.length < 3 ? errors.message = 'Must be at least 3 characters' : errors.message = true
                },
                email: () => {
                    const validEmail = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/
                    !validEmail.test(value) ? errors.email = 'Must be a valid email' : errors.email = true
                }
            }

            validation[name]()

            errors.form = true
            for (let key in errors) {
                if (errors[key] != true) {
                    errors.form = false;
                    break
                }
            }
            return errors
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        userServices.sendMessage(message)
            .then(res => navigate('/thankyou')) //TODO: add pop-up here to acknowledge message
            .catch(res => console.log(res)) // TODO: add validation errors display
    }

    return (<>
        {title ? <>
            <h2>Purchase Inquiry</h2>
            <p>Thank you for inquiring about <span className="fw-bold text-decoration-underline fst-italic">{title}</span></p>
            <p>Please submit the form below and we'll contact you as soon as possible.</p>
        </>
            : <>
                <h2>Inquiry</h2>
                <p>Got a Question?</p>
                <p>Send us a note and we'll get back to you as soon as possible</p>
            </>
        }
        <Form onSubmit={handleSubmit}>
            <Row className='form'>
                <Form.Group as={Col}>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='First Name'
                        name='firstName'
                        value={message.firstName}
                        onChange={updateInput}
                    />
                    <p className='text-danger'>{errors.firstName}</p>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Last Name'
                        name='lastName'
                        value={message.lastName}
                        onChange={updateInput}
                    />
                    <p className='text-danger'>{errors.lastName}</p>
                </Form.Group>
            </Row>
            <Form.Group className='form'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type='email'
                    placeholder='Email'
                    name='email'
                    value={message.email}
                    onChange={updateInput}
                />
                    <p className='text-danger'>{errors.email}</p>
                    </Form.Group>
            <Row className='form'>
                <Form.Group as={Col}>
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder='message'
                        name='message'
                        value={message.message}
                        onChange={updateInput}
                    />
                    <p className='text-danger'>{errors.message}</p>
                </Form.Group>
            </Row>
            {
                errors.form ?
                    <Button type='submit' className='form'>Submit</Button>
                    :
                    <Button type='submit' className='form' variant='secondary' disabled>Submit</Button>
            }
        </Form>
    </>)
}