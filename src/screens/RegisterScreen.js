import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col,Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/userActions";
import anytime from "../image/anytime.jpg";
import offer from "../image/offer3.png";
import logo from "../image/welcome.png";
// import css from "../components/css/Nav.css";
import adc from '../image/userrss.jpg'

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("")
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(register(name, email, password,contact));
    }
  };

  return (
    <>
    <style jsx>{`
     
     .box-shadow {
	-webkit-box-shadow: 0px 10px 20px 0px rgba(50, 50, 50, 0.52);
	-moz-box-shadow:    0px 10px 20px 0px rgba(50, 50, 50, 0.52);

 
}
     
   `}</style>
   
    
     <Row>
      <Col md={5} style={{marginTop:"150px"}}>
      <Carousel>
      {/* <Carousel.Item>
        <img
          className="d-block w-100"
          src={anytime}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Any time, Any where</h3>
         
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={offer}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Grab offers</h3>
          
        </Carousel.Caption>
      </Carousel.Item> */}
      <Carousel.Item>
        <img
          className="d-block w-100"
          width= "100px"
          height="50px"
          src={adc}
          alt="Third slide"
        />

        <Carousel.Caption>
          {/* <h3>Most welcome to our store</h3> */}
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
      
      </Col>
      <div style={{width:"50%" ,height:"60%"}} className="panel panel-default box-shadow">
      <Col md={13}>
        <FormContainer>
          <h1>Sign Up</h1>
        
          {message && <Message variant="danger">{message}</Message>}
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label><i style={{color:"#df4759"}} className="fas fa-user"></i> Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label><i style={{color:"#df4759"}} className="fas fa-envelope-square"></i> Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="contact">
              <Form.Label><i style={{color:"#df4759"}} className="fas fa-envelope-square"></i> Contact</Form.Label>
              <Form.Control
                type="contact"
                placeholder="contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              ></Form.Control>
            </Form.Group>




            <Form.Group controlId="password">
              <Form.Label><i style={{color:"#df4759"}} className="fas fa-unlock-alt"></i> Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="confirmPassword">
              <Form.Label><i style={{color:"#df4759"}} className="fas fa-check-circle"></i> Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="danger" className="signin-btn" block>
            Sign Up
          </Button>
          </Form>
          <hr/>

          <Row className="py-3">
            <Col>
            Already have an account? {" "}
              <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
              <h7 style={{color:"#df4759"}}>Sign In Now!</h7>
              </Link>
            </Col>
          </Row>
        </FormContainer>
      </Col>
      </div>
    </Row>
  
    </>
  );
};

export default RegisterScreen;
