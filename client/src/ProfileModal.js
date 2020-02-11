import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ProfileModal(props) {
  let data = props.data ? props.data : {}; // prevents null ptr exception.

  // Handles data conditionals
  
  let img = data.img ? <img src={data.img} alt='Profile Image' /> : <p>No Image Found!</p>;
  let waiver = data.waiver ? 'Has Waiver' : 'Does Not Have Waiver!';
  let payment = data.payment ? 'Has Payed' : 'Has Not Payed!';

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {data.name}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* TODO: format json into nicer html here */}
        {img}
        <p>Name: {data.name} </p>
        <p>Registration Date: {data.reg} </p>
        <p>Waiver Status: {waiver} </p>
        <p>Payment Status: {payment} </p>
        {JSON.stringify(data)}
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProfileModal;
