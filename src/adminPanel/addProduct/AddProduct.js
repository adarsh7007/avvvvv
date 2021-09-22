
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { createProduct } from "../../actions/productActions";


const AddProduct = ({ location, history }) => {
   
    const [title, setTitle] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [price, setPrice] = useState("");
    const [Desc, setDesc] = useState("");
    const [category, setCategory] = useState("");
    const [countInStock, setCountInStock] = useState("");
    const [message, setMessage] = useState(null);
    const dispatch = useDispatch();

    const productCreate = useSelector((state) => state.productCreate);
    const { loading, error } = productCreate;

    const userLogin = useSelector((state) => state.userLogin);
    if (userLogin.userInfo.isAdmin === false) {
        history.push('/profile');
    }
    const { userInfo } = userLogin;
    const redirect = location.search ? location.search.split("=")[1] : "/";

    // useEffect(() => {
    //     if (userLogin.userInfo.isAdmin == false) {
    //         history.push(redirect);
    //     }
    // }, [history, userInfo, redirect]);
    // useEffect(() => {
    //     // dispatch(listProducts());
    //     dispatch(listProducts({ name: name !== 'all' ? name : '' }));
    //      return()=>{
    //              //
    //  };
    //  }, []);
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createProduct(title, imageUrl, price, Desc, category, countInStock));

        history.push(`/Listbook`)
   alert("Book Added Successfully!!")
    }


return (
    <>
        <style jsx>{`
       
       .box-shadow {
      -webkit-box-shadow: 0px 10px 20px 0px rgba(50, 50, 50, 0.52);
      -moz-box-shadow:    0px 10px 20px 0px rgba(50, 50, 50, 0.52);
  
   
  }
       
     `}</style>


        <Row>
            <Col md={5} style={{ marginTop: "150px" }}>
                <Carousel>
                    {/* <Carousel.Item>
          <img
            classtitle="d-block w-100"
            src={anytime}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Any time, Any where</h3>
           
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            classtitle="d-block w-100"
            src={offer}
            alt="Third slide"
          />
  
          <Carousel.Caption>
            <h3>Grab offers</h3>
            
          </Carousel.Caption>
        </Carousel.Item> */}
                    <Carousel.Item>
                       

                        <Carousel.Caption>
                            {/* <h3>Most welcome to our store</h3> */}
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>

            </Col>
            <div style={{ width: "50%", height: "60%" }} classtitle="panel panel-default box-shadow">
                <Col md={13}>
                    <FormContainer>
                        <h1>Add product</h1>

                      
                        {error && <Message variant="danger">{error}</Message>}
                        {loading && <Loader />}
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId="title">
                                <Form.Label><i style={{ color: "#df4759" }}
                                 classtitle="fas fa-user"></i> title</Form.Label>
                                <Form.Control
                                    type="title"
                                    placeholder="Enter title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                ></Form.Control>
                    
                            </Form.Group>
                            <Form.Group controlId="price">
                                <Form.Label><i style={{ color: "#df4759" }}
                                 classtitle="fas fa-user"></i> price</Form.Label>
                                <Form.Control
                                    type="price"
                                    placeholder="Enter price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="imageUrl">
                                <Form.Label><i style={{ color: "#df4759" }} 
                                classtitle="fas fa-envelope-square"></i> imageUrl</Form.Label>
                                <Form.Control
                                    type="imageUrl"
                                    placeholder="Enter imageUrl"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId="Desc">
                                <Form.Label><i style={{ color: "#df4759" }} 
                                classtitle="fas fa-envelope-square"></i> Desc</Form.Label>
                                <Form.Control
                                    type="Desc"
                                    placeholder="Desc"
                                    value={Desc}
                                    onChange={(e) => setDesc(e.target.value)}
                                ></Form.Control>
                            </Form.Group>



                            <div className="col-4">
                        <div className="form-group">
                          <label>Genre</label>
                          <select class="form-select" aria-label="Default select example"  value={category} name="category"  onChange={(e) => setCategory(e.target.value)} >
                            <option>Select Option</option>
                            {/* <option>Ebook</option> */}
                            <option>Fiction</option>
                            <option>Non fiction</option>
                            <option>Literature</option>
                            <option>Academic</option>
                            <option>Romance</option>
                            <option>Politics</option>
                            <option>Motivational</option>
                            <option>Biography</option>
                            <option>Poetry</option>
                            <option>Short Stories</option>
                            <option>Others</option>
                          </select>
                        </div>
                      </div>
                            {/* <Form.Group controlId="category">
                                <Form.Label><i style={{ color: "#df4759" }} 
                                classtitle="fas fa-unlock-alt"></i> category</Form.Label>
                                <Form.Control
                                    type="category"
                                    placeholder="Enter category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                ></Form.Control>
                            </Form.Group> */}

                            <Form.Group controlId="countInStock">
                                <Form.Label><i style={{ color: "#df4759" }} classtitle="fas fa-check-circle"></i> countInStock</Form.Label>
                                <Form.Control
                                    type="countInStock"
                                    placeholder="Confirm countInStock"
                                    value={countInStock}
                                    onChange={(e) => setCountInStock(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Button type="submit" variant="danger" classtitle="add product" block>
                              add product
                            </Button>
                        </Form>
                        <hr />

                
                    </FormContainer>
                </Col>
            </div>
        </Row>

    </>
);
  };

export default AddProduct
