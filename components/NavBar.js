import React, { useRef, useState } from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import {withSnackbar} from 'notistack'
import { useStateContext } from "../hooks/useSQML";
import CustomFileInput from '../components/FileInput';
import CreateFile from "./CreateFile";
import CreateConnection from "./CreateConnection";
import ViewConnections from "./ViewConnections";
import ManageSessions from "./ManageSessions";
import CustomSaveDialog from "./CustomFileSave";

function NavBar(props) {
    const [extToSave, setExtToSave] = useState('')

    const {
      setModalShow,
      setModalManageSessionsShow,
      setModalDirectoryChooseShow,
      saveFile
    } = useStateContext();

    const fileInputRef = useRef(null);
    const fileOutputRefSQL = useRef(null);
    const fileOutputRefSQML = useRef(null);
    const fileOutputRefJS = useRef(null);

    const handleReadButtonClick = () => {
      fileInputRef.current.click(); 
    };

    const handleDownloadFileButtonClick = (ref) => {
      ref.current.click(); 
    };  

    const handleSaveFileButtonClick = (ext) => {
      setExtToSave(ext);
      setModalDirectoryChooseShow(true);
    };

    const handleSaveFileExists = () => {
      setModalDirectoryChooseShow(!saveFile(props))
    }

    return(
      <>        
        <CustomFileInput reference={fileInputRef}></CustomFileInput>
        <CreateFile reference={fileOutputRefSQL}></CreateFile>
        <CreateFile reference={fileOutputRefSQML} ext={'sqml'}></CreateFile>
        <CreateFile reference={fileOutputRefJS} name={'traduction'} ext={'js'}></CreateFile>
        <CustomSaveDialog ext={extToSave}></CustomSaveDialog>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand>SQMongoL</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavDropdown title="File" id="basic-nav-dropdown">   
                  <NavDropdown.Item onClick={handleReadButtonClick}>Open File</NavDropdown.Item>
                  {
                    process.env.NEXT_PUBLIC_ENV === "WEB" ? <>
                      <NavDropdown.Item onClick={() => handleDownloadFileButtonClick(fileOutputRefSQL)}>Download File As (SQL)</NavDropdown.Item>
                      <NavDropdown.Item onClick={() => handleDownloadFileButtonClick(fileOutputRefSQML)}>Download File As (SQML)</NavDropdown.Item>
                      <NavDropdown.Item onClick={() => handleDownloadFileButtonClick(fileOutputRefJS)}>Download File As (MONGO)</NavDropdown.Item>
                    </> : <>
                      <NavDropdown.Item onClick={() => handleSaveFileExists()}>Save File</NavDropdown.Item>
                      <NavDropdown.Item onClick={() => handleSaveFileButtonClick("sql")}>Save File As (SQL)</NavDropdown.Item>
                      <NavDropdown.Item onClick={() => handleSaveFileButtonClick("sqml")}>Save File As (SQML)</NavDropdown.Item>
                      <NavDropdown.Item onClick={() => handleSaveFileButtonClick("js")}>Save File As (MONGO)</NavDropdown.Item>
                    </>
                  }                 
                </NavDropdown>
                <NavDropdown title="Connections" id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={()=>setModalShow(true)}>Manage Connections</NavDropdown.Item>
                </NavDropdown>  
                <NavDropdown title="Work Sessions" id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={()=>setModalManageSessionsShow(true)}>Manage Sessions</NavDropdown.Item>
                </NavDropdown>                           
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <CreateConnection></CreateConnection>
        <ViewConnections></ViewConnections>
        <ManageSessions></ManageSessions>
      </>
    )
}

export default withSnackbar(NavBar);