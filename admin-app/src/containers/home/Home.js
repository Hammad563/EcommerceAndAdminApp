import React from 'react';
import { Jumbotron, Container, Row, Col } from 'react-bootstrap';
import Layout from '../../components/Layout/Layout';
import '../../App.css';
import { isUserLogginIn } from '../../actions';
import './Home.css';
import { NavLink } from 'react-router-dom';


export default function Home(props) {

    return (
        <React.Fragment>
          <Layout sidebar>
          <h1>Welcome To the Admin App!</h1>
          </Layout>
        
        </React.Fragment>
    )
}
