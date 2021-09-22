import React from "react";
import AOS from 'aos';
// import '../../../node_modules/aos/dist/aos.css';
// import '../../../../node_modules/aos/dist/aos.css';

//import { Component } from "react";
import {useSelector, useDispatch } from 'react-redux'; 
import Axios from 'axios';
import $ from 'jquery';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import createReactClass from 'create-react-class';


function Dashboard(props) {
  
  

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  try {
    Axios.get('/api/orders', {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }) .then(res => {
      const orders = res.data.length;
      if(orders > 0){
      $(".ordervalue").text(orders)
      }else{
        $(".ordervalue").text("0")
      }
    })
  } catch (error) {
    // setErrorUpload(error.message);
    // setLoadingUpload(false);
  }
  try {
    Axios.get(`http://localhost:5000/get/product`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }) .then(res => {
      const products = res.data.length;
      if(products > 0){
      $(".productsvalue").text(products)

      $(".authorsvalue").text("44")
      $(".soldbooks").text("65")
      }else{
        $(".productsvalue").text("0")

        $(".authorsvalue").text("44")
      $(".soldbooks").text("65")
      }
    })
  } catch (error) {
    // setErrorUpload(error.message);
    // setLoadingUpload(false);
  }
  if(userLogin.userInfo == null){
    props.history.push(`/signin`);
  }else
  if(userLogin.userInfo.isAdmin==false){
    props.history.push(`/profile`);
    }
  return (    
    <>
    
    <style jsx>{`
      .front-nav{
        display:none;
      }
      .section-footer{
        display:none;
      }
      .navTop{
        display:none;
      }
      .admin-nav{
        display:block!important;
      }
    `}</style>
   {/* Content Wrapper. Contains page content */}
   <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0 text-dark">Dashboard</h1>
              </div>{/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><a href="#">Home</a></li>
                  <li className="breadcrumb-item active">Dashboard v1</li>
                </ol>
              </div>{/* /.col */}
            </div>{/* /.row */}
          </div>{/* /.container-fluid */}
        </div>
        {/* /.content-header */}
        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            {/* Small boxes (Stat box) */}
            <div className="row">
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-info">
                  <div className="inner">
                    <h3><span className="ordervalue"></span></h3>
                    <p>New Orders</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-bag" />
                  </div>
                  {/* <Link to = 'Orderlist' className="small-box-footer">More info<i className="fas fa-arrow-circle-right" /></Link> */}
                  <a href="Orderlist" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                </div>
              </div>
              {/* ./col */}
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-success">
                  <div className="inner">
                    {/* <h3>53<sup style={{fontSize: '20px'}}>%</sup></h3> */}
                    <h3><span className="productsvalue"></span></h3>
                    <p>Product</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-stats-bars" />
                  </div>
                  <a href="admin/productlist" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                </div>
              </div>
              {/* ./col */}
              <div className="col-lg-3 col-6">
                {/* small box */}
                {/* <div className="small-box bg-warning">
                  <div className="inner">
                    <h3><span className="authorsvalue"></span></h3>
                    <p>Authors</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-person-add" />
                  </div>
                  <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                </div> */}
              </div>
              {/* ./col */}
              <div className="col-lg-3 col-6">
                {/* small box */}
                {/* <div className="small-box bg-danger">
                  <div className="inner">
                    <h3><span className="soldbooks"></span></h3>
                    <p>Sold Books</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-pie-graph" />
                  </div>
                  <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                </div> */}
              </div>
              {/* ./col */}
            </div>
            {/* /.row */}
            {/* Main row */}
            <div className="row">
             
             
            </div>
            {/* /.row (main row) */}
          </div>{/* /.container-fluid */}
        </section>
        {/* /.content */}
      </div>
      {/* /.content-wrapper */}
    </>
  );
 }

export default Dashboard;