import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../slices/ShowProductSlice';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { addToCart } from '../slices/CartSlice';
import  axios  from 'axios';

const ProductsHomePage = () => {
    const dispatch= useDispatch();
    const {Products,loading}=useSelector((state)=>state.products);
    const {userId, token}=useSelector((state)=>state.login);
    // const addTocart=(id)=>{
    //     console.log("add to cart", id);
    //     const filteredItem= Products.filter((item)=>item._id==id)[0]
    //     dispatch(setCart(filteredItem));
    // }
const addItemToCart = async (productId, quantity, user, token) => {
  console.log(`token`, token);
    try {
        const response = await axios.post('/api/cart/additem', 
            { productId, quantity, user }, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        dispatch(addToCart(response.data));
    } catch (error) {
        console.error('Failed to add item to cart:', error);
    }
};


    useEffect(()=>{
        dispatch(getProducts());
    },[]);
    return (
      <Container>
      {
        loading?<><div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div></>:
    <Row>
        {
           Products?.map((item)=>{
            return(
            <Col md={3} className='g-4'>
            <Card key={item.id} style={{ width: '18rem' }}>
           <Link to={`/product/${item._id}`}>
           <Card.Img variant="top" src={item.image} style={{objectFit: "cover", height:"200px",width:"200px",margin:"0 auto"}} className='p-3'/>
           </Link>
            <Card.Body>
              <Card.Title className='text-truncate'>{item.title}</Card.Title>
              <Card.Text>
                Price: ₹{item.price}
              </Card.Text>
              <Button variant="primary" onClick={()=>{addItemToCart(item._id, item.quantity, userId, token)}}>ADD TO CART</Button>
            </Card.Body>
          </Card>
            </Col>
            )
           }) 
        }
    </Row>
    }
      </Container>
  )
}

export default ProductsHomePage