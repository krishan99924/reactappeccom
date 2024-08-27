import React from 'react'
import { Container, NavDropdown } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import {logout} from "../slices/LoginSlice";

const NavbarCom = () => {
  const navigate = useNavigate();
  const goToPosts = () =>navigate('/cart');
  const {cartItems}= useSelector((state)=>state.cart)
  const {userDetail} = useSelector((state)=>state.login)
  const dispatch= useDispatch();
    const handleLogout = () => {
      dispatch(logout()); // Reset login state in Redux
  };
  
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
    <Container>
      <Link to="/" style={{textDecoration:"none"}}><Navbar.Brand>Eccomerce Shop</Navbar.Brand></Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Link to="/login" style={{textDecoration:"none"}}><Nav.Link href="#home">Login</Nav.Link></Link>
            <Nav.Link onClick={goToPosts} style={{position:"relative"}}><i class="fa-solid fa-cart-shopping"></i><span style={{position:"absolute",width:"20px",height:"20px",borderRadius:"50%",backgroundColor:"red",display:"flex",justifyContent:"center",alignItems:"center",top:"0",right:"-5px",color:"white"}}>{cartItems?.length}</span></Nav.Link>
          <Link to="/dashboard" style={{textDecoration:"none"}}><Nav.Link href="#home">Dashboard</Nav.Link></Link>
          <NavDropdown title={`${userDetail?.name!==undefined?userDetail?.name:"Guest"}`} id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Bookmarks
            </NavDropdown.Item>
            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            <NavDropdown.Divider />
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default NavbarCom;