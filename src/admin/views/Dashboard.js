
import React from "react";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import {useSelector, useDispatch } from 'react-redux'; 
import Axios from 'axios';
import $ from 'jquery';
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Table,
  Button,
  Label,
  FormGroup,
  Input,
  UncontrolledTooltip,
} from "reactstrap";

// core components
import PanelHeader from "../components/PanelHeader/PanelHeader.js";

import {
  dashboardPanelChart,
  dashboardShippedProductsChart,
  dashboardAllProductsChart,
  dashboard24HoursPerformanceChart,
} from "../variables/charts.js";
import { useHistory } from "react-router";

function Dashboard(props) {

const history = useHistory()

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
    Axios.get(`http://localhost:5000/get/product`,{
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
history.push(`/signin`);
  }else if(userLogin.userInfo.isAdmin==false){
 history.push(`/profile`);
    }
  return (
    <>
    <style jsx>
     {`
     .card-counter{
      box-shadow: 2px 2px 10px #DADADA;
      margin: 5px;
      padding: 20px 10px;
      background-color: #fff;
      height: 100px;
      border-radius: 5px;
      transition: .3s linear all;
    }
  
    .card-counter:hover{
      box-shadow: 4px 4px 20px #DADADA;
      transition: .3s linear all;
    }
  
    .card-counter.primary{
      background-color: #007bff;
      color: #FFF;
    }
  
    .card-counter.danger{
      background-color: #ef5350;
      color: #FFF;
    }  
  
    .card-counter.success{
      background-color: #66bb6a;
      color: #FFF;
    }  
  
    .card-counter.info{
      background-color: #26c6da;
      color: #FFF;
    }  
  
    .card-counter i{
      font-size: 5em;
      opacity: 0.2;
    }
  
    .card-counter .count-numbers{
      position: absolute;
      right: 35px;
      top: 20px;
      font-size: 32px;
      display: block;
    }
  
    .card-counter .count-name{
      position: absolute;
      right: 35px;
      top: 65px;
      font-style: italic;
      text-transform: capitalize;
      opacity: 0.5;
      display: block;
      font-size: 18px;
    }
     
     `}
    </style>
      {/* <PanelHeader
        size="lg"
        content={
          <Line
            data={dashboardPanelChart.data}
            options={dashboardPanelChart.options}
          />
        }
      /> */}
     <div class="container-fluid">
    <div class="row">
    <div class="col-md-3">
      <div class="card-counter primary">
        <i class="fa fa-code-fork"></i>
        <span className="count-numbers" className="productsvalue"></span>
        <span class="count-name">Product</span>
      </div>
    </div>

    <div class="col-md-3">
      <div class="card-counter danger">
        <i class="fa fa-ticket"></i>
        <span class="ordervalue"></span>
        <span class="count-name">Orders</span>
      </div>
    </div>

    <div class="col-md-3">
      <div class="card-counter success">
        <i class="fa fa-database"></i>
        <span class="count-numbers">6875</span>
        <span class="count-name">Data</span>
      </div>
    </div>

    {/* <div class="col-md-3">
      <div class="card-counter info">
        <i class="fa fa-users"></i>
        <span class="count-numbers">35</span>
        <span class="count-name">Users</span>
      </div>
    </div> */}
  </div>
</div>
    </>
  );
}

export default Dashboard;
