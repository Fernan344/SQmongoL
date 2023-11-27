import React from "react";
import { StatusCodes } from "http-status-codes"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Modal from './Modal';
import {withSnackbar} from 'notistack'
import { useStateContext } from "../hooks/useSQML";

function CreateConnection (props) {
    const {
        setModalShow, 
        showErrors,
        modalNewConnectionShow, 
        setModalNewConnectionShow,
        connections,
        updateConnections,
        testConnection
    } = useStateContext();
    
    const saveConnection = () => {
        const name = document.getElementById("newConnectionName").value
        const uri = document.getElementById("newConnectionURI").value
        
        if(connections.filter(c => c.name === name)) {
          showErrors(props, "Connection name is already exists")
          return
        }

        updateConnections([...(connections || []), {name, uri}])
        setModalShow(true); 
        setModalNewConnectionShow(false);
    }
  
    const handleTestConnection = () => {
        const uri = document.getElementById("newConnectionURI").value
        testConnection(props, uri)
    }

    const modalNewConnectionFooter = <>
      <Button variant="primary" type="button" onClick={saveConnection}>
          Save
        </Button>
      <Button variant="primary" type="button" onClick={handleTestConnection}>
          Test
      </Button>
      <Button onClick={()=>{ setModalNewConnectionShow(false); setModalShow(true); }}>Cancel</Button>
    </>

    const modalBodyCreateConnection = () => <>
      <Form>
        <Form.Group className="mb-3" controlId="newConnectionName">
          <Form.Label>Connection Name: </Form.Label>
          <Form.Control type="text" placeholder="My First Connection" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="newConnectionURI">
          <Form.Label>Connection URI: </Form.Label>
          <Form.Control type="text" placeholder="mongodb://root:root@localhost:27017" />
        </Form.Group>        
      </Form>
    </>

    return (
        <Modal 
            show={modalNewConnectionShow} 
            onHide = {()=>{setModalNewConnectionShow(false); setModalShow(true);}}    
            modalFooter = {modalNewConnectionFooter}
            componentDidMount = {() => {}}
            modalTitle = {"Create Connection"}
            modalBody = {modalBodyCreateConnection}
        />
    )
}

export default withSnackbar(CreateConnection)