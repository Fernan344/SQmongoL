import axios from 'axios';
import { withSnackbar } from 'notistack';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import get from 'lodash/get';
import { useStateContext } from '../hooks/useSQML';
import { useState } from 'react';
import set from 'lodash/set'

function ConnectionCard(props) {
    const {
        setDbs, 
        setCharge, 
        setMyURI, 
        showSuccess, 
        showErrors, 
        connections, 
        updateConnections,
        showWarning,
        testConnection
    } = useStateContext()

    const [editMode, setEditMode] = useState(false)

    const handlerConnect = () => {
        setCharge(true)
        axios.patch('/api/connect', {uri: props.uri})
        .then((response) => {
            axios.get('/api/connect')
            .then((response) => {
                props.onSuccess()
                showSuccess(props, 'Connection established successfuly')
                setDbs(get(response, 'data.databases', []))
                setMyURI(props.uri)
                setCharge(false)
            }).catch((err) => {
                showErrors(props, get(err, 'message', `Connection can not get Databases`))
                setCharge(false)
            })
        })
        .catch((err) => {
            setDbs([])
            setMyURI('none')
            setCharge(false)
            showErrors(props, get(err, 'response.data.message', `Connection can not be stablished`))
        })
    }

    const deleteConnection = () => {
        const connectionsAux = [...connections];
        const removed = connectionsAux.splice(props.index, 1);
        updateConnections(removed);
        showSuccess(props, 'Connections has been deleted successfully')
    }

    const updateConnection = () => {
        showWarning(props, `You are editind ${props.name} connection`);
        setEditMode(true);
    }

    const changeConnectionData = () => {
        const name = document.getElementById("connectionName").value
        const uri = document.getElementById("connectionURI").value

        const connectionsAux = [...connections];
        set(connectionsAux, props.index, { name, uri })
        updateConnections(connectionsAux);
        showSuccess(props, 'Connections has been edited successfully')
        setEditMode(false);
    }

    const handleTestConnection = () => {
        const uri = document.getElementById("connectionURI").value
        testConnection(props, uri)
    }

    return (
        <Card key={props.key}>
            <Card.Header as="h5">
                {
                    editMode ?
                    <><Form>
                        <Form.Group className="mb-3" controlId="connectionName">
                            <div class="row" style={{top: '0.5rem', position: 'relative'}}>
                                <div class="col">  
                                    <Form.Control type="text" placeholder="Connection Name" defaultValue={props.name}></Form.Control>
                                </div> 
                            </div>
                        </Form.Group>
                    </Form></> 
                    : props.name
                }
            </Card.Header>
            <Card.Body>
                <Card.Title>{""}</Card.Title>
                <Card.Text>
                    {
                        editMode ? 
                        <><Form>
                            <Form.Group className="mb-3" controlId="connectionURI">
                                <div class="row">
                                    <div class="col">  
                                        <Form.Control as="textarea" rows={3} type="text" placeholder="Connection URI" defaultValue={props.uri}></Form.Control>
                                    </div> 
                                </div>
                            </Form.Group>
                        </Form></> 
                        : props.uri
                    }
                </Card.Text>
                {
                    editMode ? <>
                        <Button variant="success" onClick={changeConnectionData}>Guardar</Button>
                        <Button variant="warning" onClick={handleTestConnection}>Test</Button>
                        <Button variant="danger" onClick={() => {setEditMode(false)}}>Cancelar</Button>
                    </>
                    : <>
                        <Button variant="success" onClick={handlerConnect}>Connect</Button>
                        <Button variant="warning" onClick={updateConnection}>Edit</Button>
                        <Button variant="danger" onClick={deleteConnection}>Delete</Button>
                    </>
                }
            </Card.Body>
        </Card>
    );
}


export default withSnackbar(ConnectionCard);