import React from 'react';
import {Navbar, Nav, NavDropdown, Container} from 'react-bootstrap';
import {NavLink, Link} from  'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { signout } from '../../actions/auth.actions';


export default function Header(props) {

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(signout());
  }

  const renderLoggedInLinks = () =>{
    return (
      <Nav>
          <li className="nav-item">
            <span className="nav-link" onClick={logout}>Sign Out</span>
          </li>
      </Nav>

    );
  }

  const renderNonLoggedInLinks = () => {
    return (
        <Nav>
          <li className="nav-item">
            <NavLink to="signin" className="nav-link">Log in</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="signup" className="nav-link">Sign Up</NavLink>
          </li>
      </Nav>
    );
  }


    return (
        <Navbar collapseOnSelect bg="light" expand="lg" style={{zIndex:1}}>
     <Container fluid>
        <Link to="/" className="navbar-brand"> Admin Dashboard</Link>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className='mr-auto'>

        </Nav>
        {auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks() }

      
 </Navbar.Collapse>
  </Container>
</Navbar>
    )
}
