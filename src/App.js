import React from 'react'
import AOS from 'aos';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import {  } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'
import ContactScreen from './screens/ContactScreen'
import { useDispatch, useSelector } from "react-redux";
import AddProduct from './adminPanel/addProduct/AddProduct';
import AdminLayout from './admin/layouts/Admin';
const App = (props) => {




  return (
    <div>
      
    <Router>
       
    <Header />
      
      <Route path="/admin" component={AdminLayout} />
      {/* <Redirect to="/admin/dashboard" /> */}
     
        <Switch>
          <main >
     
<div className="container-fluid" style={{marginTop:60}}>
              <Route exact path='/register' component={RegisterScreen} />
              <Route exact path='/login' component={LoginScreen} />

              <Route path='/order/:id' component={OrderScreen} />
              <Route path='/shipping' component={ShippingScreen} />
              <Route path='/payment' component={PaymentScreen} />
              <Route path='/placeorder' component={PlaceOrderScreen} />


              <Route path='/contact' component={ContactScreen} />
              <Route path='/profile' component={ProfileScreen} />
              <Route path='/product/:id' component={ProductScreen} />
              <Route path='/addtoCart/:id?' component={CartScreen} />
              <Route path='/admin/userlist' component={UserListScreen} />
              <Route path='/admin/user/:id/edit' component={UserEditScreen} />
              <Route
                path='/admin/productlist'
                component={ProductListScreen}
                exact
              />
              <Route
                path='/admin/productlist/:pageNumber'
                component={ProductListScreen}
                exact
              />
                <Route path='/admin/addProduct/' component={AddProduct} />
              <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
              <Route path='/admin/orderlist' component={OrderListScreen} />
              <Route path='/search/:keyword' component={HomeScreen} exact />
              <Route path='/page/:pageNumber' component={HomeScreen} exact />
              {/* <Route path='/admin' component={Dashboard} exact /> */}
              <Route
                path='/search/:keyword/page/:pageNumber'
                component={HomeScreen}
                exact
              />
              <Route exact path='/' component={HomeScreen} />
              
</div>
          </main>
        </Switch>
        <Footer />

    

    </Router>
    </div>
  )
}

export default App
