// import Image from 'react-bootstrap/Image'
import { useEffect } from 'react'
import { useState } from 'react'
import { paintingServices } from '../../services/paintingServices'
import { useNavigate } from 'react-router-dom'
import { Row, Col, Figure } from 'react-bootstrap'

export const Gallery = () => {
    const [paintings, setPaintings] = useState([])
    const [gallery, setGallery] = useState([])
    const [isAdmin, setIsAdmin] = useState(false)
    const navigate = useNavigate()


    useEffect(() => {
        paintingServices.get()
            .then(paintings => {
                const rowSize = 3;
                const rows = []
                for (let i = 0; i < paintings.length; i += rowSize) {
                    rows.push(paintings.slice(i, i + rowSize))
                }
                setGallery(rows)
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
                setPaintings(prev => prev.filter(painting => painting.id != id))
            })
            .catch(error => console.log(error))
    }

    return (<>
        <h1>Artwork</h1>
        {
            gallery.map((row, index) => {
                return (
                    <Row key={index}>
                        {
                            row.map(painting => {
                                return (
                                    <Col key={painting.id}>
                                        <Figure onClick={() => navigate(`/gallery/${painting.id}`)}>
                                            <Figure.Image src={`http://${window.location.hostname}:8020/api/paintings/images/${painting.img}`} />
                                            <Figure.Caption>{painting.title}</Figure.Caption>
                                        </Figure>
                                    </Col>
                                )
                            })

                        }
                    </Row>

                )
            })
            // paintings.map(({ id, title, description, price, dateCompleted, img, productVariation = 0 }, index) => {
            //     return (
            //         <Row key={id} className='my-4'>
            //             <Col>
            //                 <Image src={`http://${window.location.hostname}:8020/api/paintings/images/${img}`} fluid />
            //             </Col>
            //             <Col>
            //                 <h3>{title}</h3>
            //                 <p>{description}</p>
            //                 <p>{formatPrice(price)}</p>
            //                 <p>Date Completed: {dateCompleted ? (new Date(dateCompleted)).toLocaleDateString() : 'N/A'}</p>
            //                 {isAdmin ?
            //                     <Row>
            //                         <Col>
            //                             <Button onClick={() => navigate(`/admin/artwork/edit/${id}`)}>Edit</Button>
            //                         </Col>
            //                         <Col>
            //                             <Button onClick={() => handleDelete(id)} variant='danger' >Delete</Button>
            //                         </Col>
            //                     </Row>
            //                     :
            //                     <Row>
            //                         <Col>
            //                             <Form.Select aria-label="Default select example" onChange={(e) => updateProductVariation(e.target.value, index)}>
            //                                 <option value={0}>Select an Option</option>
            //                                 <option value="Original Oil">Original Oil</option>
            //                                 <option value="Canvas Print">Canvas Print</option>
            //                                 <option value="Paper Print">Paper Print</option>
            //                             </Form.Select>
            //                         </Col>
            //                         <Col>
            //                             {productVariation != 0 ?
            //                                 <Button onClick={() => navigate(`/contact?title=${title}&paintingId=${id}&productVariation=${productVariation}`)} >Buy</Button>
            //                                 :
            //                                 <Button variant='secondary' disabled >Buy</Button>
            //                             }
            //                         </Col>
            //                     </Row>

            //                 }
            //             </Col>
            //         </Row>
            //     )
            // })
        }
    </>)
}