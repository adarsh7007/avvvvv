import axios from 'axios'
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_ADD_ITEM_FAIL,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_ADD_PAYMENT_METHOD,
  CART_CREATE_ITEM,
  SHIPPING_DETAILS_FAIL,
  SHIPPING_DETAILS_REQUEST,
  SHIPPING_DETAILS_SUCCESS
} from '../constants/cartConstants'


export const addToCart = (productId, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`http://localhost:5000/get/product/${productId}`);
  const {
    cart: { cartItems },
  } = getState();

  dispatch({
    type: CART_ADD_PAYMENT_METHOD,
    payload: {
      product: data._id,
      title: data.title,
      imageUrl: data.imageUrl,
      Price: data.Price,
      countInStock: data.countInStock,
      qty,
    },
  });
  localStorage.setItem(
    'cartItems',
    JSON.stringify(getState().cart.cartItems)
  );

};
// export const addToCart = () => async (dispatch, getState) => {
//   const { data } = await axios.get("http://localhost:5000/auth/getCartProducts")
// console.log(data,'bbs')
//   dispatch({
//     type: CART_ADD_ITEM,
//     payload: {

//       product: data._id,
//       title: data.title,
//       imageUrl: data.imageUrl,
//       Price: data.Price,
//       countInStock: data.countInStock,

//     },
//   })

//   localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
// }

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (name, contact, city, state, pincode) => async (dispatch, getState) => {
  try {
    dispatch({
      type:  CART_ADD_ITEM,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      "http://localhost:5000/address",
      { name, contact,city, state, pincode },
      config
    )

    dispatch({
      type: CART_SAVE_SHIPPING_ADDRESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  }  catch (error) {

  }
  //localStorage.setItem('SHIPPINGAddress', JSON.stringify(data))
}


export const getShippingDetails = (userId) => async (dispatch, getState) => {

  dispatch({ type: SHIPPING_DETAILS_REQUEST, payload: userId });
  const {
    userLogin: { userInfo },
  } = getState();

  try {
    const { data } = await axios.get(`http://localhost:5000/address/${userInfo.userId}`, {

    headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    console.log('ii',data)
    dispatch({ type: SHIPPING_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: SHIPPING_DETAILS_FAIL, payload: message });
  }
};



export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  })

  localStorage.setItem('paymentMethod', JSON.stringify(data))
}
