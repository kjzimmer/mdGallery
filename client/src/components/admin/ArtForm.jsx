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
        dateCompleted: '',
        img: 'blank.jpg',
    })

    const [errors, setErrors] = useState({
        title: false,
        description: false,
        price: false,
        dateCompleted: false,
        img: false
    })

    const { id } = useParams()

    useEffect(() => {
        if (id) {
            paintingServices.get(id)
                .then(res => {
                    setPainting(res)
                    setErrors({
                        title: true,
                        description: true,
                        price: true,
                        dateCompleted: true,
                        img: true,
                        form: true
                    })
                })
                .catch(error => console.log(error))
        }
    }, [])

    const updateInput = e => {
        let { name, value, type, checked } = e.target

        if (type === 'checkbox') value = checked
        if (type === 'file') {
            value = e.target.files[0].name
            onFileSelected(e)
        }

        setPainting(prev => ({ ...prev, [name]: value }))

        setErrors(prev => {
            let errors = { ...prev }

            const validation = {
                title: () => {
                    value.length < 3 ? errors.title = 'Must be at least 3 characters' : errors.title = true
                },
                description: () => {
                    value.length < 3 ? errors.description = 'Must be at least 3 characters' : errors.description = true
                },
                price: () => {
                    !(value > 0) ? errors.price = 'Must be greater than 0' : errors.price = true
                },
                dateCompleted: () => {
                    value.length < 10 ? errors.dateCompleted = 'Must be at valid date' : errors.dateCompleted = true
                },
                img: () => {
                    console.log('img: ', value == 'blank.jpg' || value.length < 1)
                    value == 'blank.jpg' || value.length < 1 ? errors.img = 'Must select an image' : errors.img = true
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

        const file = e.target.img.files[0]

        const formData = new FormData()
        formData.append('img', file)

console.log('submitting painting')
        submitForm(painting)
            .then(res => navigate('/admin/artwork'))
            .catch(error => console.log(error))

        // paintingServices.upload(formData)
        //     .then(res => {
        //         submitForm(painting)
        //             .then(res => navigate('/admin/artwork'))
        //             .catch(error => console.log(error))
        //     })
        //     .catch(error => console.log(error))
    }


    function onFileSelected(event) {
        var selectedFile = event.target.files[0];
        var reader = new FileReader();

        var imgtag = document.getElementById("artPic");
        imgtag.title = selectedFile.name;

        reader.onload = function (event) {
            imgtag.src = event.target.result;
        };

        reader.readAsDataURL(selectedFile);
    }

    return (<>
        <Row key={id} className='my-4'>
            <Col>
                <Image src={`http://${window.location.hostname}:8020/api/paintings/images/${painting.img}`} fluid id="artPic" alt='Choose file' />
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
                        <p className='text-danger'>{errors.title}</p>
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
                        <p className='text-danger'>{errors.description}</p>
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
                        <p className='text-danger'>{errors.price}</p>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Date Completed</Form.Label>
                        <Form.Control
                            type='date'
                            name='dateCompleted'
                            value={painting.dateCompleted}
                            onChange={updateInput}
                        />
                        <p className='text-danger'>{errors.dateCompleted}</p>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Img</Form.Label>
                        <Form.Control
                            type='file'
                            name='img'
                            // value={painting.img}
                            onChange={updateInput}
                        />
                        <p className='text-danger'>{errors.img}</p>
                    </Form.Group>


                    <Row className='form'>
                    </Row>
                    <Row className='form'>
                    </Row>
                    {
                        errors.form ?
                            <Button type='submit' className='form'>Submit</Button>
                            :
                            <Button type='submit' className='form' variant='secondary' disabled>Submit</Button>
                    }
                </Form>
            </Col>
        </Row>
    </>)
}