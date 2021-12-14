import React from 'react';
import Header from '../Header/Header';
import {Container, Row, Col, } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './layout.css';


export default function Layout(props) {
    return (
        <React.Fragment>

            <Header></Header>
            {
                props.sidebar ? 
                    <Container fluid>
                    <Row>
                        <Col md={2} className="sidebar">
                            <ul>
                                <li><NavLink exact to={`/`}>Home</NavLink></li>
                                <li><NavLink  to={`/page`}>Page</NavLink></li>
                                <li><NavLink to={`/products`}>Products</NavLink></li>
                                <li><NavLink to={`/orders`}>Orders</NavLink></li>
                                <li><NavLink to={`/cat`}>Category</NavLink></li>
                            </ul>
                        </Col>
                        <Col md ={10} style={{marginLeft: 'auto', paddingTop: '60px'}}>
                        {props.children}
                        </Col>
                     </Row>
                    </Container>
                    :
                    props.children
            }
           
            
        </React.Fragment>
    )
}
