import React, { useState } from 'react'
import { Button, Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AddToCart } from './../AddToCart';
import { Favourite } from './Favourite';
// import { CompressedImg } from './../common/Image';
// import Watch from '../../utils/images/product.jpg'

export const Product = ({ product }) => {
    const [name, setName] = useState(product.name)
    const [focus, setFocus] = useState(false)

    return (
        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Card className="mb-4">
                <Favourite isFavourite={product?.isFavourite} id={product._id} />
                <div style={{ height: "500px" }}>
                    <Card.Img height={'500px'} style={{ objectFit: 'cover', padding: '10px', marginTop: '5px', aspectRatio: 1 }} variant="top" src={product.image} alt={'compressed'} />
                </div>
                <Card.Body>
                    {focus ? <input className='mb-2' onChange={(e) => setName(e.target.value)} value={name} onBlur={() => setFocus(false)} /> : <Card.Title onClick={() => setFocus(true)}>{name.slice(0, 15)}...</Card.Title>}
                    <Link to={`/products/${product._id}`}>
                        <Button variant="primary">View Details</Button>
                    </Link>
                </Card.Body>
                <AddToCart data={{ product }} />
            </Card>
        </Col>
    )
}
