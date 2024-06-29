import { useEffect, useState } from "react"
import { userServices } from "../../services/userServices"

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export const Contacts = () => {
    const [contacts, setContacts] = useState([])

    useEffect(() => {
        userServices.getContact()
            .then(res => {
                console.log(res)
                setContacts(res)
            })
            .catch(error => console.log('get contacts error: ', error))
    }, [])

    return (<>
        <h1>Contacts</h1>
        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
        {
            contacts.map(contact => (
                <Card key={contact.id} style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>{contact.firstName} {contact.lastName}</Card.Title>
                        <Card.Text>{contact.createdAt}</Card.Text>
                        <Card.Text>{contact.message}</Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>
            ))
        }
    </>)
}