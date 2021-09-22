import React ,{useState}from "react";
import { Route, NavLink ,useLocation,withRouter,Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import SearchBox from "./SearchBox";
import { logout } from "../actions/userActions";
import abc from '../image/welcome.png'
// import css from "./css/Nav.css";
import logo from "../image/logo3.png"

const Header = (props) => {
  const location = useLocation()
  const dispatch = useDispatch();
  
const [name, setName] = useState('')
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo} = userLogin;
  const userDetails = useSelector((state) => state.userDetails)
  const {  user } = userDetails
  const logoutHandler = () => {
    dispatch(logout());
    dispatch()
  };
  if (location.pathname==="/login") {
    return false;
  }
   else if (location.pathname==="/register") {
      return false;
     
}
else if (location.pathname==="/admin/dashboard") {
  return false;

}
else if (location.pathname==="/admin/productlist") {
  return false;

}
  return (
    <><style jsx>{`
  
    `}</style>
    <header > 
     <nav  style={{backgroundColor:'white'}}
     className="navbar navbar-expand-lg navbar-light fixed-top">
      <div>
        <NavLink style={{ color: 'white' }} to="/">
          <img width="100" height="10" src={abc} />
        </NavLink>
      </div>
      <div className="container">

        <div className="navbar-collapse" id="main_nav">
          <div style={{ marginLeft: 149 }}></div>
          <div className="col-xl-7 col-xs-12 p-0  header_search_bar">
            {/* <form action="#" method="post" id="post">           
              <input type="text" className="form-control" name="search" placeholder="Search by Book Title or Author Name" id="search-bar" autoComplete="off" required />
            </form> */}

            <div>
              <Route
                render={({ history }) => (
                  // <SearchBox onChange={evalue=>setNamenav(evalue)}  ></SearchBox> 

                  <SearchBox history={history} ></SearchBox>
                )}
              ></Route>

            </div>


          </div>
          <ul style={{ marginRight: 0 }} className="navbar-nav ml-auto ss-nav-left">
            <li className="nav-item d-flex align-items-center">

              {userInfo ? (

                <div className="btn-login mr-3 btn-user dropdown">
                  <Link className="btn dropdown-toggle btn" style={{color:'#df4759'}}
                    id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {userInfo.name}
                  </Link>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">

                    <NavLink
                      activeClassName="menuActive" style={{color:'danger'}}
                      exact to="/Profile" className="dropdown-item">
                      <i style={{color:'#df4759'}} className="fa fa-user mr-3" />My Profile</NavLink>
                    <NavLink
                      activeClassName="menuActive"
                      exact to="/" className="dropdown-item" onClick={logoutHandler}>
                      <i style={{color:'#df4759'}} className="fa fa-door-closed mr-3" />Logout</NavLink>
                  </div>
                </div>
              ) :
                (<NavLink activeClassName="menuActive"
                  className="nav-link" exact to="/login" className="btn mr-3 btn-danger btn-top ss-login text-white" >
                  Login</NavLink>
                )}



            </li>
          </ul>
          <hr/>
        </div>

      </div>
         </nav>
        
    <br/>
    </header>
</>
  );
};

export default withRouter(Header);
