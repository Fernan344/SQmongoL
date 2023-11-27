import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from './Modal';
import ConnectionCard from './ConnectionCard';
import {withSnackbar} from 'notistack'
import { useStateContext } from "../hooks/useSQML";

function ViewConnections () {

    const {
        modalShow, setModalShow, 
        connections, setModalNewConnectionShow,
        modalConnectionsDidMount
    } = useStateContext();

    const modalConnectionsFooter = 
    <>
      <Button onClick={()=> setModalShow(false) }>Close</Button>
      <Button onClick={()=>{ setModalShow(false); setModalNewConnectionShow(true); }}>Crate New</Button>
    </>

    return (
        <Modal 
            show= {modalShow} 
            onHide = {()=>setModalShow(false)}        
            modalFooter = {modalConnectionsFooter}
            componentDidMount = {modalConnectionsDidMount}
            modalTitle = {"Connections"}
            modalBody = {() => 
              connections.map((con, index)=><ConnectionCard key={`conCard${index}`} name={con.name} uri={con.uri} index={index} onSuccess={()=>setModalShow(false)}/>)
            }
        />   
    )
}

export default withSnackbar(ViewConnections)