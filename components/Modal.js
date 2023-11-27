import React, {useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';

function CModal(props) {
    const { modalBody, modalTitle, modalFooter, componentDidMount, show, onHide, componentDidUpdate } = props;

    useEffect(() => {
        componentDidMount()
    }, [])

    useEffect(() => {
        if(componentDidUpdate && componentDidUpdate.props && componentDidUpdate.props.length) componentDidUpdate.method()
    }, componentDidUpdate && componentDidUpdate.props ? componentDidUpdate.props : [])

    const body = modalBody()

    return (
        <>            
            <Modal
                {...{show, onHide}}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    {modalTitle}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{maxHeight: "60vh", overflowY: "auto"}}>
                        {body}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {modalFooter}
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CModal;