import { useEffect } from 'react';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { paintingServices } from '../../services/paintingServices';
import { useNavigate, useParams } from 'react-router-dom';
import Image from 'react-bootstrap/Image'



export const ArtForm = ({ submitForm }) => {
    const navigate = useNavigate()
    const [painting, setPainting] = useState({
        title: '',
        description: '',
        price: '',
        img: 'blank.jpg',
        isSold: false
    })

    const { id } = useParams()

    useEffect(() => {
        if (id) {
            paintingServices.get(id)
                .then(res => {
                    setPainting(res)
                })
                .catch(error => console.log(error))
        }
    }, [])

    const updateInput = e => {
        let { name, value, type, checked } = e.target

        if (type === 'checkbox') value = checked
        if (type === 'file'){
            value = e.target.files[0].name
            onFileSelected(e)
        } 

        setPainting(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const file = e.target.img.files[0]
  
        const formData = new FormData()
        formData.append('img', file)
  
        paintingServices.upload(formData)
        .then(res => {
            console.log('painting: ', painting)
            
            submitForm(painting)
                .then(res => navigate('/admin/artwork'))
                .catch(error => console.log(error))
        })
        .catch(error => console.log(error))
    }


    function onFileSelected(event) {
        var selectedFile = event.target.files[0];
        var reader = new FileReader();
      
        var imgtag = document.getElementById("artPic");
        imgtag.title = selectedFile.name;
      
        reader.onload = function(event) {
          imgtag.src = event.target.result;
        };
      
        reader.readAsDataURL(selectedFile);
      }

    return (<>
        <Row key={id} className='my-4'>
            <Col>
                <Image src={`http://localhost:8010/api/paintings/images/${painting.img}`} fluid id="artPic" alt='Choose file'/>
            </Col>
            <Col>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Title'
                            name='title'
                            value={painting.title}
                            onChange={updateInput}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Description'
                            name='description'
                            value={painting.description}
                            onChange={updateInput}
                        />
                    </Form.Group>
                    <Form.Group className='form'>
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type='number'
                            placeholder='Price'
                            name='price'
                            value={painting.price}
                            onChange={updateInput}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Sold</Form.Label>
                        <Form.Control
                            type='checkbox'
                            name='isSold'
                            checked={painting.isSold}
                            onChange={updateInput}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Img</Form.Label>
                        <Form.Control
                            type='file'
                            name='img'
                            // value={painting.img}
                            // onChange={updateInput}
                            onChange={updateInput}
                        />
                    </Form.Group>


                    <Row className='form'>
                    </Row>
                    <Row className='form'>
                    </Row>
                    <Button type='submit' className='form'>
                        Submit
                    </Button>
                </Form>
            </Col>
        </Row>
    </>)
}