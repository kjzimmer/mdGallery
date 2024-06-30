import Image from 'react-bootstrap/Image'
import { useEffect } from 'react'
import { useState } from 'react'
import { paintingServices } from '../../services/paintingServices'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import Button from 'react-bootstrap/esm/Button'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom'

export const Artwork = () => {
    const [paintings, setPaintings] = useState([])
    const [isAdmin, setIsAdmin] = useState(false)
    const navigate = useNavigate()


    useEffect(() => {
        paintingServices.get()
            .then(paintings => {
                if (window.location.pathname.indexOf('admin') > 0) setIsAdmin(true)
                setPaintings(paintings)
            })
            .catch(error => {
                console.log('ue error: ', error)
            })
    }, [])


    const formatPrice = (price, options) => {
        if (!options) {
            options = {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
            }
        }
        return parseFloat(price).toLocaleString("en-US", options)
    }

    const updateProductVariation = (value, paintingIndex) => {
        console.log(value)
        setPaintings(prev => prev.map((painting, index) => index == paintingIndex ? { ...painting, productVariation: value } : painting))
    }

    const handleDelete = (id) => {
        paintingServices.delete(id)
        .then(res => {
            setPaintings(prev => prev.filter(painting => painting.id !=id))
        })
        .catch(error => console.log(error))
    }

    return (<>
        <h2>artwork</h2>
        {
            paintings.map(({ id, title, description, price, dateCompleted, img, productVariation = 0 }, index) => {
                return (
                    <Row key={id} className='my-4'>
                        <Col>
                            <Image src={`http://localhost:8010/api/paintings/images/${img}`} fluid />
                        </Col>
                        <Col>
                            <h3>{title}</h3>
                            <p>{description}</p>
                            <p>{formatPrice(price)}</p>
                            <p>Date Completed: {dateCompleted ? dateCompleted : 'N/A'}</p>
                            {isAdmin ?
                                <Row>
                                    <Col>
                                        <Button onClick={() => navigate(`/admin/artwork/edit/${id}`)}>Edit</Button>
                                    </Col>
                                    <Col>
                                        <Button onClick={() => handleDelete(id)} variant='danger' >Delete</Button>
                                    </Col>
                                </Row>
                                :
                                <Row>
                                    <Col>
                                        <Form.Select aria-label="Default select example" onChange={(e) => updateProductVariation(e.target.value, index)}>
                                            <option value={0}>Select an Option</option>
                                            <option value="Original Oil">Original Oil</option>
                                            <option value="Canvas Print">Canvas Print</option>
                                            <option value="Paper Print">Paper Print</option>
                                        </Form.Select>
                                    </Col>
                                    <Col>
                                        {productVariation != 0 ?
                                            <Button onClick={() => navigate(`/contact/${title}/${productVariation}`)} >Buy</Button>
                                            :
                                            <Button variant='secondary' disabled >Buy</Button>
                                        }
                                    </Col>
                                </Row>

                            }
                        </Col>
                    </Row>
                )
            })
        }
    </>)
}