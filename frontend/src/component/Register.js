import React, {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { register } from './api/calls';

function Register() {

    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const [email, setemail] = useState("")

    const handleSubmit = (event) => {
        console.log(email)
        register({username: username, email : email, password : password})
        //const form = event.currentTarget;
        //if (form.checkValidity() === false) {
        //  event.preventDefault();
        //  event.stopPropagation();
        //}
    
        //setValidated(true);
    };
    
    return (
        <Container fluid className="body">
            <div className="d-flex padding-top-10 padding-bottom-10 justify-content-center align-items-center">
                <Form className="form">
                <h1>Inscription</h1>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control required type="text" name="username" value={username} onChange={e => setusername(e.target.value)} className="form-control form-sign" id="username" placeholder="Votre nom"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control required type="email" name="email" value={email} onChange={e => setemail(e.target.value)} className="form-control form-sign" id="email" aria-describedby="emailHelp" placeholder="Votre email"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Mot de passe</Form.Label>
                        <Form.Control required type="password" minLength= "6" name="password" value={password} onChange={e => setpassword(e.target.value)} className="form-control form-sign" id="password" placeholder="Votre mot de passe"/>
                    </Form.Group>
                    <div className="text-center">
                        <Button onClick={handleSubmit} variant="primary">Se connecter</Button>
                    </div>
                    <br></br>
                    
                    {"error && <p>{error.message}</p>"}
                </Form>
            </div>
        </Container>
    )
}

export default Register
