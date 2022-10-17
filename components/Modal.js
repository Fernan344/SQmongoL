import React, {useEffect,useState} from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ConnectionCard from './ConnectionCard';

function CModal(props) {
    const [ connections, setConnections ] = useState([])

    useEffect(() => {
        axios.get("/api/connections").then(({data}) => {
            setConnections(data)
        }).catch((error) => {
            setConnections([])            
        })
    }, [])

    const cards = connections.map((con)=><ConnectionCard name={con.name} uri={con.uri} onSuccess={props.onHide}/>)

    return (
        <>            
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    Connections
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        cards
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CModal;