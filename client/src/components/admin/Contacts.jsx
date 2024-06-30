import { useEffect, useState } from "react"
import { userServices } from "../../services/userServices"

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

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
        <h1>Inquiries</h1>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Subject</th>
                    <th>IsRead</th>
                </tr>
            </thead>
            <tbody>
            {
            contacts.map(contact => (
                <tr key={contact.id}>
                    <td>{contact.createdAt}</td>
                    <td>{contact.firstName} {contact.lastName}</td>
                    <td>{contact.product ? `${contact. productVariation} of ${contact.product}` : 'General Inquiry'}</td>
                    <td>??</td>
                </tr>

                // <Card key={contact.id} style={{ width: '18rem' }}>
                //     <Card.Body>
                //         <Card.Title>{contact.firstName} {contact.lastName}</Card.Title>
                //         <Card.Text>{contact.createdAt}</Card.Text>
                //         <Card.Text>{contact.message}</Card.Text>
                //         <Button variant="primary">Go somewhere</Button>
                //     </Card.Body>
                // </Card>
            ))
        }
            </tbody>
        </Table>
    </>)
}