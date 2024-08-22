import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { paintingServices } from "../../services/paintingServices"
import { Row, Col, Image, Form, Button } from "react-bootstrap"

export const ArtDetail = () => {
    const { id } = useParams()
    const [painting, setPainting] = useState({})

    useEffect(() => {
        if (id) {
            paintingServices.get(id)
                .then(res => {
                    setPainting(res)
                })
                .catch(error => console.log(error))
        }
    }, [])

    return (<>
        <Row key={id} className='my-4'>
            <Col>
                <Image src={`http://${window.location.hostname}:8020/api/paintings/images/${painting.img}`} fluid id="artPic" alt='Choose file' />
            </Col>
            <Col>
                <p>Title: {painting.title}</p>
                <p>Description: {painting.description}</p>
                <p>Price: {painting.price}</p>

            </Col>
        </Row>

    </>)
}