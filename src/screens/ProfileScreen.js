import React, { useState, useEffect } from 'react'
import { Table, Form, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import axios from 'axios'
import Loader from '../components/Loader'
// import css from '../components/css/Nav.css'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
// import { listMyOrders } from '../actions/orderActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { data } from 'jquery'

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [contact, setContact] = useState('')
  const [password, setPassword] = useState('')
const [data,setData]=useState([])
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const orderListMy = useSelector((state) => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const request = axios.get(`http://localhost:5000/address/${userInfo.userId}`,data)
  request.then((response)=>{
    console.log("iiii",data);
  });

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else  if (!user  || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))

       
    }
      else {
        setName(user.name)
        setEmail(user.email)
        setContact(user.contact)
      }
   
  }, [dispatch ,history,userInfo , user,success])

console.log(user.id)
  const submitHandler = (e) => {
    e.preventDefault()
    if(user) {
      dispatch(updateUserProfile({ id: user.id, name, email }))
    }else{
      console.log("error")
    }
  }

  return (
   <> <style jsx>{`
     
    .box-shadow {
      width: 2250px;
  box-shadow: 0 10px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
 
}
<div 
  `}</style>
    <Row style={{marginTop:25}}>
    <div style={{borderRadius:10,width:"25%",alignItems:'center'}} className="panel panel-default box-shadow">
      <Col md={12} style={{alignItems:'center'}} >
        <h2>User Profile</h2>
        {/* {
          message && <Message variant='danger'>{message}</Message>
        } */}

        { }

        {
          success && <Message variant='success'>Profile Updated</Message>
        }

        {

          loading ? (
            <Loader />
          ) : error ? (

            <Message variant='danger'>{error}</Message>

          )
            :
            (
              <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type='name'
                    placeholder='Enter name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='contect'>
                  <Form.Label>Contact</Form.Label>
                  <Form.Control
                    type='contect'
                    placeholder='contact'
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                {/* <Form.Group controlId='password'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Confirm password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group> */}

                <Button type="submit" variant="danger" className="signin-btn" block>
                  Update
                </Button>
              </Form>
            )
        }
        <br></br>

      </Col>
      </div>
      <div style={{borderRadius:10,padding:10,width:"65%",marginLeft:40}}className="panel panel-default box-shadow">
      <Col md={20} >
        <h2>Orders History</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant='danger'>{errorOrders}</Message>
        ) : (
          <Table  className='table-sm profile-section'>
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Title</th>
                <th>Price</th>
                <th>Category</th>
                <th>Description</th>
               
              </tr>
            </thead>
            <tbody>
              {request.data.map((order,i) => (
                <tr key={i}>
                  <td>{order.id}</td>
                  {/* <td>{order.createdAt.substring(0, 10)}</td> */}
                  <td>{order.contact}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  {/* <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td> */}
                  {/* <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button  variant="success" className="signin-btn">
                        Details
                      </Button>
                    </LinkContainer>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
</div>
    </Row>
    </>
  )
}

export default ProfileScreen
