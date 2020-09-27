import React, {useEffect} from 'react'
import { actionTypes } from '../reducer';
import { useGlobalState } from "../StateProvider";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function Home() {
    const [{user}, dispatch] = useGlobalState()
    const [modalShow, setModalShow] = React.useState(false);
    //const [logged, setlogged] = useState(initialState)

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
                    <React.Fragment>
                        <p>Welcome</p>
                        <p>Pensez à vous inscrire pour créer un utilisateur</p>
                        <p>Vous pourrez ensuite vous connecter</p>
                    </React.Fragment>
                    
                ) : (
                    <React.Fragment>
                        <p>Welcome {user && user.username}</p>
                        <p>Vos informations :</p>
                        <p>Username : {user && user.username}</p>
                        <p>Email : {user && user.email}</p>
                        <Button variant="primary" onClick={() => setModalShow(true)}>
                            Modifier ses informations
                        </Button>

                        <MyVerticallyCenteredModal
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                        />
                    </React.Fragment>
                    
                )
            }
        </div>
    )
}

function MyVerticallyCenteredModal(props) {
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
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          <Button variant="primary" type="submit">Submit</Button>
        </Modal.Footer>
      </Modal>
    );
  }

export default Home
