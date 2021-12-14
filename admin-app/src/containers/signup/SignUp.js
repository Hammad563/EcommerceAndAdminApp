import React from 'react';
import {Form, Button,Row, Col, Container} from 'react-bootstrap';
import Layout from '../../components/Layout/Layout';
import Input from '../../components/UI/Input/Input';
import {Redirect} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { signup } from '../../actions';
import { useState, useEffect } from 'react';




export default function SignUp(props) {
    // dispatch/auth
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.user);
    // useStates
    const [firstName, setfirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    

    const userSignup = (e) => {
        e.preventDefault();

        const user = {
            firstName, lastName, email, password
         }
        dispatch(signup(user));
    }

    if(auth.authenticate){
        return <Redirect to={`/`}></Redirect>
    }

    if(user.loading){
        return <p>loading...</p>
    }




    return (
        <div>
            <Layout>
                <Container>
                    <Row style={{marginTop: '70px'}}>
                        <Col md={{span: 6, offset: 3}}>
                            <Form onSubmit = {userSignup}>
                                    <Row>
                                        <Col md={6}>
                                           <Input
                                           label = "First Name"
                                           placeholder = "First Name"
                                           Value = {firstName}
                                           Type = "text"
                                           onChange={ (e) => setfirstName(e.target.value)

                                           }>
                                           </Input>
                                        </Col>

                                        <Col md={6}>
                                        <Input
                                           label = "Last Name"
                                           placeholder = "Last Name"
                                           Value = {lastName}
                                           Type = "text"
                                           onChange={ (e) => setLastName(e.target.value)
                                               
                                           }>
                                           </Input>
                                        </Col>
                                    </Row>


                                    <Input
                                           label = "Email"
                                           placeholder = "Email"
                                           Value = {email}
                                           Type = "email"
                                           onChange={ (e) => setEmail(e.target.value) 
                                               
                                           }>
                                     </Input>

                                     <Input
                                           label = "Password"
                                           placeholder = "Password"
                                           Value = {password}
                                           Type = "password"
                                           onChange={ (e) => setPassword(e.target.value)
                                               
                                           }>
                                           </Input>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
        </Layout>
    </div>
    )
}
