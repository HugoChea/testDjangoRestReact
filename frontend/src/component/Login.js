import React from 'react'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useGlobalState } from "../StateProvider";

function Login() {

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
    
        //setValidated(true);
    };

    return (
        <Container fluid className="body">
            <div className="d-flex padding-top-10 padding-bottom-10 justify-content-center align-items-center">
                <Form className="form" onSubmit={handleSubmit}>
                <h1>Se connecter</h1>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control required type="email" name="email" value={"email"}  className="form-control form-sign" id="email" aria-describedby="emailHelp" placeholder="Votre email"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Mot de passe</Form.Label>
                        <Form.Control required type="password" minLength= "6" name="password" value={"password"} className="form-control form-sign" id="password" placeholder="Votre mot de passe"/>
                    </Form.Group>
                    <div className="text-center">
                        <Button variant="primary" type="submit">Se connecter</Button>
                    </div>
                    <br></br>
                    
                    {"error && <p>{error.message}</p>"}
                </Form>
            </div>
        </Container>
    )
}

export default Login
