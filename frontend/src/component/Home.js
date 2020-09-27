import React, {useEffect, useState} from 'react'
import { actionTypes } from '../reducer';
import { useGlobalState } from "../StateProvider";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { updateUserMail } from './api/calls';
import Container from 'react-bootstrap/Container';

function Home() {
    const [{user}, dispatch] = useGlobalState()
    const [modalShow, setModalShow] = React.useState(false);
    //const [logged, setlogged] = useState(initialState)

    const update = (e) => {
        console.log(e)
        updateUserMail({email : e, id : user.id, token : user.token}, (res) => {
            console.log(res)
            const data = JSON.parse(localStorage.getItem('authUser'));
            dispatch({
                type: actionTypes.SET_USER,
                user: res.user
            })
        },(err) =>{
            console.log(err)
            
        })
        setModalShow(false)
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
        <div>
            {!user ?
                (
                    <Container fluid className="info">
                        <p>Welcome</p>
                        <p>Pensez à vous inscrire pour créer un utilisateur</p>
                        <p>Vous pourrez ensuite vous connecter</p>
                    </Container>
                    
                ) : (
                    <Container fluid className="info">
                        <h2>Welcome {user && user.username}</h2>
                        <p>Vos informations :</p>
                        <p>Username : {user && user.username}</p>
                        <p>Email : {user && user.email}</p>
                        <Button variant="primary" onClick={() => setModalShow(true)}>
                            Modifier ses informations
                        </Button>

                        <MyVerticallyCenteredModal
                            email = {user.email}
                            updateuser = {(e) => update(e)}
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                        />
                    </Container>
                    
                )
            }
        </div>
    )
}

function MyVerticallyCenteredModal(props) {

    const [{user}, dispatch] = useGlobalState()
    const [email, setemail] = useState(user.email)

    const handleClick = () => {
        props.updateuser(email);
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modifier ses informations
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" value={email} onChange={e => setemail(e.target.value)} placeholder="Enter email" />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => handleClick(user.email)} variant="primary" type="submit">Submit</Button>
        </Modal.Footer>
      </Modal>
    );
  }

export default Home
