import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
// import css from './css/Nav.css'

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <><style jsx>{`
    .form-control:focus {
        color: #df4759;
        outline: #df4759;
        outline-color:#df4759;
        box-shadow: 0 0 0 0.01rem #df4759;
        outline: none;
     
    } 
    .form-control {
    display: block;
    width: 100%;
    height: calc(1.5em + .75rem + 2px);
    padding: .375rem .75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid  rgba(219, 100, 102, 0.52);
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
  
    `}</style>
    <form className="search" onSubmit={submitHandler}>
    <div className="row has-warning">

    {/* <form action="#" method="post" id="post">            */}
{/* <input type="text" className="form-control" name="q" id="q" placeholder="Search by Book Title or Author Name"   onChange={(e) => props.onChange(e.target.value)} required /> */}
    
<input style={{color:"red"}} type="text" className="form-control mobile-search-box-danger focus" name="q"
 id="q" placeholder="Search here..........."  

 onChange={(e) => setKeyword(e.target.value)}/>
 </div>
 </form>
      
</>
  )
}

export default SearchBox
