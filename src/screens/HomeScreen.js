import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";
import { listProducts } from "../actions/productActions";
import Footer from "../components/Footer"

const HomeScreen = ({ match ,props}) => {
  const keyword = match.params.keyword;
const data =[]

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, product, page, pages } = productList;
// console.log('ww',product[0].title)
useEffect(() => {
  if (data) {
    dispatch(listProducts())
  }else{
console.log('err')
    }
   
}, [dispatch, ])


  return (
    <>
      <Meta />

      <ProductCarousel />

      <h1>All Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
        <section>
          <Row>
            {product.map((prod ,i) => {
              console.log("ww",prod)
              return(
       
              <Col key={i} sm={12} md={6} lg={4} xl={3}>
                <Product prod={prod} />
              </Col>
      )})}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
            </section>
            <hr style={{marginTop:"5px",
 marginBottom:"5px",
 height:"5px",
 width:"100%",
 borderTop:"2px solid gray"}}/>
        </>
      )}
    
    </>
   
  );
};

export default HomeScreen;
