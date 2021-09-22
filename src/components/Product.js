import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Card } from 'react-bootstrap'
import Rating from './Rating'
// import css from './css/Nav.css'

const Product = ({prod} ) => {
  return (
    <Card className='my-3 p-3 rounded home-card'>
      <Link to={`/product/${prod.id}`}>
        <Card.Img src={prod.imageUrl} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/product/${prod.id}`}>
          <Card.Title as='div'>
            <strong>{prod.title}</strong>
          </Card.Title>
        </Link>

        {/* <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text> */}

        <Card.Text as='h5'>{prod.description}</Card.Text>
      </Card.Body>
      <Button variant="danger" className="card-btn"><Link style={{color:"white"}} to={`/product/${prod.id}`}>Details</Link></Button>
    </Card>
  
  )
}

export default Product
