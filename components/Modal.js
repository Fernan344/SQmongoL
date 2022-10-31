import React, {useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';

function CModal(props) {
    const { modalBody, modalTitle, modalFooter, componentDidMount, show, onHide } = props;

    useEffect(() => {
        componentDidMount()
    }, [])

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
                    {body}
                </Modal.Body>
                <Modal.Footer>
                    {modalFooter}
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CModal;