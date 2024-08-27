import React from 'react'
import { useEffect } from 'react';
import { Button, Card, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getSingleProduct } from '../slices/ShowProductSlice';
import { addToCart } from '../slices/CartSlice';
import axios from  "axios";

const Product = () => {
  const {id}= useParams();
  const dispatch= useDispatch();
  const {Products}=useSelector((state)=>state.products);
  const {singleProduct, loading}= useSelector((state)=>state.products)
   const {userId, token}=useSelector((state)=>state.login);
  // const {singleProduct, loading}= useSelector((state)=>state.products)
//   const addTocart=(id)=>{
//     console.log("add to cart");
//     const filteredItem= Products.filter((item)=>item._id==id)[0]
//     dispatch(setCart(filteredItem));
// }
const addItemToCart = async (productId, quantity, user, token) => {
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
    console.log("id", id);
    dispatch(getSingleProduct(id))
  },[])
  return (
    <Container>
    {
      loading?<><div class="spinner-border " role="status">
      <span class="sr-only">Loading...</span>
    </div></>:
    <Card style={{display:"flex",gap:"20px" }} className='my-4'>
      <div className='d-flex align-items-center'>
      <div className="mr-3 w-50 d-flex justify-content-center">
        <Card.Img variant="top" src={singleProduct.image} style={{objectFit: "cover", width:"300px"}} className='p-3'/>
      </div>
     <Card.Body className='w-50'>
       <Card.Title>{singleProduct.title}</Card.Title>
       <hr />
       <Card.Text>
        <b>Price</b>: {singleProduct.price}₹
       </Card.Text>
       <Card.Text>
        {singleProduct.description} 
       </Card.Text>
       <Card.Text>
        <b>Rating</b>: {singleProduct?.rating?.rate} 
       </Card.Text>
       <Button variant="primary" onClick={()=>{addItemToCart(id, singleProduct.quantity, userId, token)}}>ADD TO CART</Button>
     </Card.Body>
      </div>
   </Card>
    }
    </Container>
  )
}

export default Product