import React, { useEffect, useRef, useState } from "react";
import { StatusCodes } from "http-status-codes"
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import get from 'lodash/get';
import Modal from './Modal';
import ConnectionCard from './ConnectionCard';
import {withSnackbar} from 'notistack'
import { useStateContext } from "../hooks/useSQML";

function NavBar(props) {
    const {
      modalShow, setModalShow, 
      connections, setConnections, 
      modalNewConnectionShow, setModalNewConnectionShow 
    } = useStateContext();

    const modalConnectionsFooter = 
    <>
      <Button onClick={()=>setModalShow(false)}>Close</Button>
      <Button onClick={()=>{ setModalShow(false); setModalNewConnectionShow(true); }}>Crate New</Button>
    </>

    const modalConnectionsDidMount = () => {
      const cons = JSON.parse(window.localStorage.getItem('connections'))
      setConnections(cons && cons.length ? cons : [])
    }

    const saveConnection = () => {
      const name = document.getElementById("newConnectionName").value
      const uri = document.getElementById("newConnectionURI").value
      modalConnectionsDidMount();
      const localCons = connections;
      if(localCons && localCons.length) window.localStorage.setItem('connections', JSON.stringify([...localCons, {name, uri}]))
      else window.localStorage.setItem('connections', JSON.stringify([{name, uri}]))
      modalConnectionsDidMount();
      setModalShow(true); setModalNewConnectionShow(false);
    }

    const testConnection = () => {
      const uri = document.getElementById("newConnectionURI").value
      axios.post('/api/connect', {uri})
        .then((response) => {
            if([StatusCodes.NO_CONTENT].includes(response.status)) {
              props.enqueueSnackbar('Connection established successfuly', {variant: "success"})
            }
        })
        .catch((err) => {
          props.enqueueSnackbar(get(err, 'message', `Connection can not be established`), {variant: "error"})
        })
    }

    const modalNewConnectionFooter = <>
      <Button variant="primary" type="button" onClick={saveConnection}>
          Save
        </Button>
      <Button variant="primary" type="button" onClick={testConnection}>
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

    return(
      <>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand>SQMongoL</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavDropdown title="File" id="basic-nav-dropdown">
                  <NavDropdown.Item>New File</NavDropdown.Item>
                  <NavDropdown.Item>Open File</NavDropdown.Item>
                  <NavDropdown.Item>Save File</NavDropdown.Item>
                  <NavDropdown.Item>Save File As</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Connections" id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={()=>setModalShow(true)}>Manage Connections</NavDropdown.Item>
                </NavDropdown>                           
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Modal 
            show= {modalShow} 
            onHide = {()=>setModalShow(false)}        
            modalFooter = {modalConnectionsFooter}
            componentDidMount = {modalConnectionsDidMount}
            modalTitle = {"Connections"}
            modalBody = {() => 
              connections.map((con, index)=><ConnectionCard key={`conCard${index}`} name={con.name} uri={con.uri} onSuccess={()=>setModalShow(false)}/>)
            }
        />
        <Modal 
            show={modalNewConnectionShow} 
            onHide = {()=>{setModalNewConnectionShow(false); setModalShow(true);}}    
            modalFooter = {modalNewConnectionFooter}
            componentDidMount = {() => {}}
            modalTitle = {"Create Connection"}
            modalBody = {modalBodyCreateConnection}
        />
      </>
    )
}

export default withSnackbar(NavBar);