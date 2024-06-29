import Image from 'react-bootstrap/Image'
import {getImageUrl} from '../../utils/imageUtil'
import { useEffect } from 'react'
import { useState } from 'react'
import { paintingServices } from '../../services/paintingServices'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import Button from 'react-bootstrap/esm/Button'
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
            console.log('ue error: ',error)
        })
    },[])


    const formatPrice = (price, options) => {
        if(!options){
            options = {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
            }
        }
        return parseFloat(price).toLocaleString("en-US", options)
    }

    return (<>
        <h2>artwork</h2>
        {
            paintings.map(({id, title, description, price, dateCompleted, img}) => {
                return (
                    <Row key={id} className='my-4'>
                        <Col>
                            <Image  src={`http://localhost:8010/api/paintings/images/${img}`} fluid />
                        </Col>
                        <Col>
                            <h3>{title}</h3>
                            <p>{description}</p>
                            <p>{formatPrice(price)}</p>
                            <p>Date Completed: {dateCompleted ? dateCompleted : 'N/A'}</p>
                            {isAdmin && <Button onClick={() => navigate(`/admin/artwork/edit/${id}`)}>Edit</Button>}
                        </Col>
                    </Row>
                )
            })
        }
    </>)
}