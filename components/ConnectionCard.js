import axios from 'axios';
import { withSnackbar } from 'notistack';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import get from 'lodash/get';

function ConnectionCard(props) {
    const {setDbs, charge, setCharge} = props.states

    const handlerConnect = () => {
        setCharge(true)
        axios.patch('/api/connect', {uri: props.uri})
        .then((response) => {
            console.log(response)
            axios.get('/api/connect')
            .then((response) => {
                props.onSuccess()
                props.enqueueSnackbar('Connection established successfuly', {variant: "success"})
                setDbs(get(response, 'data.databases', []))
                setCharge(false)
            }).catch((err) => {
                props.enqueueSnackbar(get(err, 'message', `Connection can not get Databases`), {variant: "error"})
                setCharge(false)
            })
        })
        .catch((err) => {
            setDbs([])
            setCharge(false)
            props.enqueueSnackbar(get(err, 'response.data.message', `Connection can not be established`), {variant: "error"})
        })
    }

    return (
        <Card key={props.key}>
            <Card.Header as="h5">{props.name}</Card.Header>
            <Card.Body>
                <Card.Title>{""}</Card.Title>
                <Card.Text>
                    {props.uri}
                </Card.Text>
                <Button variant="success" onClick={handlerConnect}>Connect</Button>
                <Button variant="warning" onClick={()=>props.enqueueSnackbar(`You are editing \"${props.name}\"`, {variant: "warning"})}>Edit</Button>
                <Button variant="danger">Delete</Button>
            </Card.Body>
        </Card>
    );
}

export default withSnackbar(ConnectionCard);