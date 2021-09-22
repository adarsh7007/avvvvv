import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../actions/cartActions";
import delivery from "../image/delivery.png";
// import css from "../components/css/Nav.css";


const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [name, setName] = useState(shippingAddress.name);

  // const [email, setEmail] = useState(shippingAddress.email);
  const [contact, setContact] = useState(shippingAddress.contact);

  const [city, setCity] = useState(shippingAddress.city);
  const [pincode, setPincode] = useState(shippingAddress.pincode);
 
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ name, contact, city, pincode }));
    history.push("/payment");
  };

  return (
    <Row>
      <Col md={4}>
        <img src={delivery} className="d-block w-100" height="400px"  alt="delivery-img" />
      </Col>
      <Col md={8}>
        <FormContainer>
          <h1>Shipping Address</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="contact">
              <Form.Label>contact</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter contacts"
                value={contact}
                required
                onChange={(e) => setContact(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter city"
                value={city}
                required
                onChange={(e) => setCity(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="pincode">
              <Form.Label>Pin Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter postal code"
                value={pincode}
                required
                onChange={(e) => setPincode(e.target.value)}
              ></Form.Control>
            </Form.Group>

          

            <Button type="submit" variant="success" className="signin-btn" block>
              Continue
            </Button>
          </Form>
        </FormContainer>
      </Col>
    </Row>
  );
};

export default ShippingScreen;
