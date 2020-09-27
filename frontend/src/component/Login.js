import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { actionTypes } from '../reducer';
import { useGlobalState } from "../StateProvider";
import { useHistory } from "react-router-dom";
import { login } from './api/calls';

function Login() {

    let history = useHistory();

    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const [email, setemail] = useState("")
    const [{user}, dispatch] = useGlobalState()

    const handleSubmit = (event) => {
        event.preventDefault();
        login({username: username, password : password}, (res) => {
            console.log(res)
            dispatch({
                type: actionTypes.SET_USER,
                user: res
            })
            
        },(err) =>{
            console.log(err)
            
        })

        history.push("/");

    };

    return (
        <Container fluid className="body">
            <div className="d-flex padding-top-10 padding-bottom-10 justify-content-center align-items-center">
                <Form className="form">
                <h1>Se connecter</h1>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control required type="email" name="email" value={username} onChange={e => setusername(e.target.value)} className="form-control form-sign" id="email" aria-describedby="emailHelp" placeholder="Votre email"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Mot de passe</Form.Label>
                        <Form.Control required type="password" name="password" value={password} onChange={e => setpassword(e.target.value)} className="form-control form-sign" id="password" placeholder="Votre mot de passe"/>
                    </Form.Group>
                    <div className="text-center">
                        <Button onClick={handleSubmit} variant="primary" type="submit">Se connecter</Button>
                    </div>
                    <br></br>
                    
                    {"error && <p>{error.message}</p>"}
                </Form>
            </div>
        </Container>
    )
}

export default Login
