import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from 'react-bootstrap/Table'

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
        <Table responsive>
          <tbody>
            <tr>
              <td><b>Name:</b></td>
              <td>{data.name}</td>
            </tr>
            <tr>
              <td><b>Registration Date:</b></td>
              <td>{data.reg}</td>
            </tr>
            <tr>
              <td><b>Waiver Status:</b></td>
              <td>{waiver}</td>
            </tr>
            <tr>
              <td><b>Payment Status:</b></td>
              <td>{payment}</td>
            </tr>
          </tbody>
        </Table>

        {/* {JSON.stringify(data)} */}
      </Modal.Body>

      <Modal.Footer>
        <Button href={waiver}>Download Waiver</Button> <Button onClick={props.onHide}>Email</Button><Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProfileModal;
