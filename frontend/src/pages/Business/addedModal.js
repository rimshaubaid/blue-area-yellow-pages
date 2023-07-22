import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
function Added(props){
    return(
<Modal
      show={props.show}
      onHide={props.closeModal}
      dialogClassName="modal-sm sm"
      contentClassName="sm"
      
    >
      <Modal.Header>
        
        <button
          type="button"
          className="close"
          onClick={props.closeModal}
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </Modal.Header>
      <Modal.Body>
        <h5>Business Successfully Added!</h5>

     <Button onClick={props.closeModal}>Ok</Button>
      </Modal.Body>
      
    </Modal>
    )
}

export default Added;