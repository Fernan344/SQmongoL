import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function ConnectionCard(props) {
    const handlerConnect = () => {
        axios.post('/api/connect', {uri: props.uri})
        .then((response) => {
            if(response.status === 200) {
                props.onSuccess()
            }else{
                alert('Error: ' + response.status)
            }
        })
        .catch((err) => {
            alert('Error: ' + err)
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
                <Button variant="warning">Edit</Button>
                <Button variant="danger">Delete</Button>
            </Card.Body>
        </Card>
    );
}

export default ConnectionCard;