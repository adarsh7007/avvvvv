import React from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import contact from "../image/contact.png";

const ContactScreen = () => {
  return (
    <div style={{marginTop:20}}>
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>what your query</p>
      </div>
      <Row>
        <Col md={6}>
          <img className="d-block w-100" src={contact} alt="contact-img" />
        </Col>
        <Col md={6}>
          <FormContainer>
            <Form>
              <Form.Group controlId="name">
                <Form.Label>
                  <i className="fas fa-user"></i> Name:{" "}
                </Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>
                  <i className="fas fa-envelope-square"></i> Email address
                </Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
              <Form.Group controlId="text">
                <Form.Label>
                  <i className="fas fa-pen"></i> Message
                </Form.Label>
                <Form.Control as="textarea" rows={2} />
              </Form.Group>

              <Button
                type="submit"
                variant="danger"
                className="signin-btn"
                block
              >
                Send
              </Button>
            </Form>
          </FormContainer>
        </Col>
      </Row>
      <Row>
        <Col className="contact-end">
          <h6>Address</h6>
          <p>
            lucknow <br />
           226010
          </p>
        </Col>
        <Col className="contact-end">
          <h6>Phone</h6>
          <p>+918381897007</p>
        </Col>
        <Col className="contact-end">
          {" "}
          <h6>Email</h6>
          <p>adarsh@test.com</p>
        </Col>
      </Row>
    </div>
  );
};

export default ContactScreen;
