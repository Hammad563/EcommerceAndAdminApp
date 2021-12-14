import './header.css';
import React, { useEffect, useState } from 'react';
//import flipkartLogo from '../../images/logo/flipkart.png';
import logo from '../../images/logo/shopee_logo.png'
//import goldenStar from '../../images/logo/golden-star.png';
import { IoIosArrowDown, IoIosCart, IoIosSearch } from 'react-icons/io';
import {  Modal, MaterialInput, MaterialButton, DropdownMenu} from '../MaterialUI/material';
import {useDispatch, useSelector} from 'react-redux'
import { login, signout } from '../../actions/auth.actions';
/**
* @author
* @function NavBar
**/

const NavBar = (props) => {

  const [loginModal, setLoginModal] = useState(false);
  const [signup, setSignup] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");

  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch();

  const userLogin = () => {
    dispatch(login({email, password}));
  }
  const logout = () => {
    dispatch(signout());
  }

//---------------------------------------------------------------

  useEffect( () => {
    if(auth.authenticate){
      setLoginModal(false);
    }

  }, [auth.authenticate]);
  
  const renderLogIn = () => {
    return(
      <DropdownMenu
            menu={
              <a className='fullName'>
              Hello, {auth.user.firstName} !
              </a>
            }
            menus={[
              { label: 'My Profile', href: '', icon: null },
              { label: 'MemberShips', href: '', icon: null },
              { label: 'Orders', href: `/accounts/orders`, icon: null },
              { label: 'Wishlist', href: '', icon: null },
              { label: 'Rewards', href: '', icon: null },
              { label: 'Gift Cards', href: '', icon: null },
              { label: 'Logout', href: '', icon: null, onClick: logout },
            ]}
            firstMenu={
              <div className="firstmenu">
                <span>Welcome back!</span>
              </div>
            }
          />
    )
  }
  const renderLogOut = () => {
    return(
      <DropdownMenu
            menu={
              <a className="loginButton" onClick={() => {setLoginModal(true); setSignup(false)}}>
                Login
              </a>
            }
            menus={[
              { label: 'My Profile', href: '', icon: null },
              { label: 'MemberShip', href: '', icon: null },
              { label: 'Orders', href: '/account/orders', icon: null, onClick: () => {!auth.authenticate && setLoginModal(true)}  },
              { label: 'Wishlist', href: '', icon: null },
              { label: 'Rewards', href: '', icon: null },
              { label: 'Gift Cards', href: '', icon: null },
            ]}
            firstMenu={
              <div className="firstmenu">
                <span>New Customer?</span>
                <a style={{ color: '#2874f0' }} onClick={ () => { setSignup(true); setLoginModal(false) }} >Sign Up</a>
              </div>
            }
          />
    )
  }

  return (
    <div className="header">


      <Modal visible={loginModal} onClose={() => setLoginModal(false)}>
        <div className="authContainer">
          <div className="row">
            <div className="leftspace">
              <h2>Login</h2>
              <p>Start Ordering Now!</p>
            </div>

            <div className="rightspace">
              <div className="loginInputContainer">
                <MaterialInput
                  type="text"
                  label="Enter Email/Enter Mobile Number"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <MaterialInput
                  type="password"
                  label="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  rightElement={<a href="#">Forgot?</a>}
                />
                <MaterialButton
                  title="Login"
                  bgColor="#423e2c"
                  textColor="#ffffff"
                  style={{
                    margin: "25px 0",
                  }}
                  onClick={userLogin}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>


      <Modal visible={signup} onClose={() => setSignup(false)}>
        <div className="authContainer">
          <div className="row">
            <div className="leftspace">
              <h2>Sign Up Now</h2>
              <p>Start Ordering Now!</p>
            </div> 

            <div className="rightspace">
              <div className="loginInputContainer">

                <MaterialInput
                  type="text"
                  label="Enter First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />

                <MaterialInput
                  type="text"
                  label="Enter Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />

                <MaterialInput
                  type="text"
                  label="Enter Email/Enter Mobile Number"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />



                <MaterialInput
                  type="password"
                  label="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  rightElement={<a href="#">Forgot?</a>}
                />
                <MaterialButton
                  title="Login"
                  bgColor="#423e2c"
                  textColor="#ffffff"
                  style={{
                    margin: "25px 0",
                  }}
                  onClick={userLogin}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>


      <div className="subHeader">
        <div className="logo">
          <a href="">
            <img src={logo} className="logoimage" alt="" />
          </a>
          {/*
          <a style={{ marginTop: '-10px' }}>
            <span className="exploreText">Explore</span>
            <span className="plusText">Plus</span>
            {<img src={goldenStar} className="goldenStar" alt="" />}
          </a>
        */}
        </div>

        <div style={{ padding: "0 10px" }}>
          <div className="searchInputContainer">
            <input className="searchInput" placeholder={"search"} />
            <div className="searchIconContainer">
              <IoIosSearch
                style={{
                  color: "#2874f0",
                }}
              />
            </div>
          </div>
        </div>
        <div className="rightMenu">
          {auth.authenticate ? renderLogIn() : renderLogOut()}
          <DropdownMenu
            menu={
              <a className="more">
                <span>More</span>
                <IoIosArrowDown />
              </a>
            }
            menus={[
              { label: "Notification Preference", href: "", icon: null },
              { label: "Sell on flipkart", href: "", icon: null },
              { label: "24x7 Customer Care", href: "", icon: null },
              { label: "Advertise", href: "", icon: null },
              { label: "Download App", href: "", icon: null },
            ]}
          />
          <div>
            <a href={`/cart`} className="cart">
              <IoIosCart />
              <span style={{ margin: "0 10px" }}>Cart</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );

}

export default NavBar