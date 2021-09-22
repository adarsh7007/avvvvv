/*!

=========================================================
* Now UI Dashboard React - v1.5.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React,{useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";

// reactstrap components
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

// core components
import PanelHeader from "../components/PanelHeader/PanelHeader.js";

import { thead, tbody } from "../variables/general";

import { listProducts } from "../../actions/productActions";
import DataTable from 'react-data-table-component';

function RegularTables() {

  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList);
  const { loading, error, product, page, pages } = productList;
  const data =[]
// console.log('ww',product[0].title)
useEffect(() => {
  if (data) {
    dispatch(listProducts())
  }else{
console.log('err')
    }
   
}, [dispatch, ])


const columns = [
  {
    name: 'title',
    selector: 'title',
    sortable: true,
  },
  {
    name: 'category',
    selector: 'category',
    sortable: true,
  },
  {
    name: 'Price',
    selector: 'price',
    sortable: true,
  },
  {
    name: 'description',
    selector: 'description',
  },
  {
    name: 'countInStock',
    selector: 'countInStock',
  },
  
];
  return (
    <>
      <PanelHeader size="sm" />
      <div className="App">
      <h3>Product</h3>
      <DataTable
        title="All Product"
        columns={columns}
        data={product}
        highlightOnHover
        pagination
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5, 15, 25, 50]}
        paginationComponentOptions={{
          rowsPerPageText: 'Records per page:',
          rangeSeparatorText: 'out of',
        }}
      />
    </div>
    </>
  );
}

export default RegularTables;
