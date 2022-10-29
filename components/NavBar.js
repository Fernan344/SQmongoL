import React, { useEffect, useRef, useState } from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Modal from './Modal';

function NavBar(props) {
    const {modalShow, setModalShow} = props.states;

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
            body={
              <div className="form-group">
                              
              </div>
            } 
            show={modalShow} 
            onHide = {()=>setModalShow(false)}    
            states = {props.states}       
        />
      </>
    )
}

export default NavBar;