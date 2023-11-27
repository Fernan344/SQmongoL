import React, {useEffect, useState} from 'react';
import { useStateContext } from "../hooks/useSQML";
import get from 'lodash/get'
import set from 'lodash/set'
import Button from 'react-bootstrap/Button';
import { withSnackbar } from 'notistack';
import Form from 'react-bootstrap/Form';
import Modal from './Modal';
import Card from 'react-bootstrap/Card';

function ManageSessions (props) {
    const [editMode, setEditMode] = useState(false)
    const [sessions, setSessions] = useState({})
    const [editingSession, setEditingSession] = useState(undefined)
    const [currentSession, setCurrentSession] = useState("")

    const {
        modalManageSessionsShow,
        setModalManageSessionsShow,
        selectNewSession
    } = useStateContext();

    useEffect(() => {
        setSessions(JSON.parse(window.localStorage.getItem('sessions'))||{});
        setCurrentSession(localStorage.getItem('currentSession'))
    }, [modalManageSessionsShow])

    const createSession = () => {
        const name = document.getElementById("newSessionName").value
        if(get(sessions, name)) {
            props.enqueueSnackbar(`Session already exists`, {variant: "error"})
            return
        }
        const newSessions = {...sessions, [name]: []}
        window.localStorage.setItem('sessions', JSON.stringify(newSessions));
        setSessions(newSessions); 
        setEditMode(false)
    }

    const deleteSessions = (sessionName) => {
        if(sessionName === currentSession) {
            props.enqueueSnackbar(`Current session can not be deleted`, {variant: "error"})
            return
        }
        const currentSessions = {...sessions}
        delete currentSessions[sessionName]; 
        setSessions(currentSessions)
        window.localStorage.setItem('sessions', JSON.stringify(currentSessions));
    }

    const editSession = (sessionName) => {
        const name = document.getElementById("newSessionNameEdit").value
        if(get(sessions, name)) {
            props.enqueueSnackbar(`Session already exists`, {variant: "error"})
            return
        }
        const currentSessions = {...sessions}
        const files = sessions[sessionName];
        delete currentSessions[sessionName]; 
        set(currentSessions, name, files);
        setSessions(currentSessions)
        window.localStorage.setItem('sessions', JSON.stringify(currentSessions));
        if(sessionName === currentSession) {
            setCurrentSession(name);
            window.localStorage.setItem('currentSession', name);
        }
        setEditingSession(undefined)
    }
    
    const modalFooter = <>
        {
            editMode ? <>
                <Form>
                    <Form.Group className="mb-3" controlId="newSessionName">
                        <div class="row" style={{top: '0.5rem', position: 'relative'}}>
                            <div class="col">  
                                <Form.Control type="text" placeholder="New Session Name" />
                            </div> 
                        </div>
                    </Form.Group>
                </Form>
                <Button onClick={createSession}>Guardar</Button>
                <Button onClick={()=>setEditMode(false)}>Cancelar</Button>
            </>:<>
                <Button onClick={()=>setEditMode(true)}>Crear</Button>
                <Button onClick={()=>setModalManageSessionsShow(false)}>Cerrar</Button> 
            </>
        }        
    </>

    const createCard = (sessionName, sessionFiles) => <Card key={`card-session-${sessionName}${sessionFiles.length}`}>
        <Card.Header as="h5">
            {
                editingSession === sessionName ?
                <><Form>
                    <Form.Group className="mb-3" controlId="newSessionNameEdit">
                        <div class="row" style={{top: '0.5rem', position: 'relative'}}>
                            <div class="col">  
                                <Form.Control type="text" placeholder="New Session Name" disabled={false} defaultValue={sessionName}></Form.Control>
                            </div> 
                            <div class="col">  
                                <Button onClick={() => editSession(sessionName)}>Guardar</Button>
                                <Button onClick={() => setEditingSession(undefined)}>Cancelar</Button>
                            </div> 
                        </div>
                    </Form.Group>
                </Form></>
                
                : `${sessionName}${sessionName === currentSession ? ' (current)':''}`
            }
        </Card.Header>
        <Card.Body>
            <Card.Title>{""}</Card.Title>
            <Card.Text>
                {sessionFiles.length} Files
            </Card.Text>
            <Button variant="success" onClick={()=>{selectNewSession(sessionName)}}>Select</Button>
            {
                sessionName === 'default' ? <></> : (sessionName === currentSession ?
                <>
                    <Button variant="warning" onClick={()=>{setEditingSession(sessionName)}}>Edit</Button>
                </>
                : <>
                    <Button variant="warning" onClick={()=>{setEditingSession(sessionName)}}>Edit</Button>
                    <Button variant="danger" onClick={()=>{deleteSessions(sessionName)}}>Delete</Button>                    
                </>)
            }

        </Card.Body>
    </Card>

    return (
        <Modal 
            show={modalManageSessionsShow} 
            onHide = {()=>{setModalManageSessionsShow(false);}}    
            modalFooter = {modalFooter}
            componentDidMount = {() => {}}
            modalTitle = {"Manage Sessions"}
            modalBody = {() => Object.keys(sessions).map((s, i) => createCard(s, get(sessions, s), i))}
        />
    )
}

export default withSnackbar(ManageSessions)