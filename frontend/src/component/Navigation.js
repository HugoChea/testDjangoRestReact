import React, { useState, useEffect} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import * as ROUTES from '../const/routes';
import { actionTypes } from '../reducer';
import { useGlobalState } from "../StateProvider";

function Navigation() {
    const [{user}, dispatch] = useGlobalState()

    const logout = (event) => {
        //event.preventDefault();
        localStorage.removeItem('authUser');
        window.location.href = '/';
    };

    useEffect(() => {
        if (localStorage.getItem(('authUser'))){
            const data = JSON.parse(localStorage.getItem('authUser'));
            dispatch({
                type: actionTypes.SET_USER,
                user: data
            })
        }
        
        return () => {
            
        }
    }, user)

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href={ROUTES.HOME}>React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                {!user &&
                    <Nav>
                        <Nav.Link href={ROUTES.REGISTER}>Register</Nav.Link>
                        <Nav.Link href={ROUTES.LOGIN}>Login</Nav.Link>
                    </Nav>
                }
                {user &&
                    <Button onClick={logout} variant="dark" > Logout </Button>
                }
            </Navbar.Collapse>
            </Navbar>
    )
}

export default Navigation
