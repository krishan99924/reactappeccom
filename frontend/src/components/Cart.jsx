import React from 'react'
import { Button, Card, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { increaseQnty, decQnty, removeFromCart ,setLoading} from '../slices/CartSlice';

const Cart = () => {
    const {cartItems,loading}=useSelector((state=> state.cart))
    const dispatch= useDispatch();
    const IncreaseQnty=(item)=>{
      dispatch(increaseQnty(item))
    }
    const decreaseQnty=(item)=>{
      dispatch(decQnty(item))
    }
    const remCart=(item)=>{
      dispatch(setLoading(true));
      dispatch(removeFromCart(item))
      dispatch(setLoading(false));
    }
    const getTotal=()=>{
      return cartItems[0]?.items.reduce((accumulator, currentValue) => accumulator + currentValue.price*currentValue.qnty, 0);
    }
    console.log(`cartItems[0]?.items`, cartItems[0]?.items);
  return (
    <Container>
      {
        loading?<><div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div></>:
        <>
        {
           
            cartItems[0]?.items.map((item)=>{
                return(
                    <Card className="mb-3">
                    <Card.Body>
                      <div className="d-flex align-items-center">
                        {/* Image on the left */}
                        <div className="mr-3 w-50 d-flex justify-content-center">
                          <Card.Img src={item.image} alt={item.title} style={{width:"300px"}}/>
                        </div>
                        {/* Details on the right */}
                        <div className='w-50'> 
                          <Card.Title>{item.title}</Card.Title>
                          <Card.Text>{item.description}</Card.Text>
                          <Card.Text>Price: ${item.price*item.qnty}</Card.Text>
                          <Card.Text>
                            <button onClick={()=>IncreaseQnty(item)}>+</button>
                            <button>{item.qnty}</button>
                            <button onClick={()=>{decreaseQnty(item)}}>-</button>

                          </Card.Text>
                          {/*Add to Cart Button */}
                          <Button variant="primary" onClick={()=>remCart(item)}>Remove To Cart</Button>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                )
            })
        }
        <h1 className='total-amount'>total amount: {getTotal()}</h1>
        </>
      }
    </Container>
  )
}

export default Cart