import React, { useState, useEffect } from "react";
import { Link ,Redirect} from "react-router-dom";
import { Form, Button, Row, Col, Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";
import anytime from "../image/anytime.jpg";
import offer from "../image/offer3.png";
import logo from "../image/welcome.png";
import adc from '../image/userrss.jpg'
// import css from "../components/css/Nav.css";

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  // const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push('/');
    }
  }, [history, userInfo, Redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <>
    <style jsx>{`
     
     .box-shadow {
	-webkit-box-shadow: 0px 10px 20px 0px rgba(50, 50, 50, 0.52);
	-moz-box-shadow:    0px 10px 20px 0px rgba(50, 50, 50, 0.52);

 
}
     
   `}</style>
   <div> <a href="/"><i className="bi bi-house"/>home</a></div>
    <Row>
  
      <Col md={4}>
        <Carousel>
       
          <Carousel.Item>
            <img
              className="d-block w-100"
              width= "100px"
              height="50px"
              src={adc}
              alt="Third slide"
            />

            <Carousel.Caption>
              {/* <h3>Most welcome<br/> to our store</h3> */}
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Col>
      <div style={{width:"50%" ,height:"60%"}} className="panel panel-default box-shadow">
      <Col md={25}>
        <FormContainer>
          <h1>Sign In</h1>
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="email">
              <Form.Label><i className="fas fa-envelope-square"></i> Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label><i className="fas fa-unlock-alt"></i> Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="danger" className="signin-btn" block>
              Sign In
            </Button>
          </Form>
          <hr  style={{
    color: '#df4759',
    backgroundColor: '#df4759',
    height: .5,
    borderColor : '#df4759'
}}/>
          <Row className="py-3">
            <Col>
            Don’t have an account?{" "}
              <Link
                to={Redirect ? `/register?redirect=${Redirect}` : "/register"}
              >
              <h7 style={{color:"#df4759"}}>Sign Up Now!</h7>
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

export default LoginScreen;
