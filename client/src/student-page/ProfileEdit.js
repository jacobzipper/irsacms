import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

function ProfileEdit(props) {
  let data = props.data ? props.data : {}; // prevents null ptr exception.

  // Handles data conditionals
  let img = data.img ? (
    <img src={data.img} alt="Profile Image" />
  ) : (
    <p>No Image Found!</p>
  );
  let waiver = data.waiver ? "Has Waiver" : "Does Not Have Waiver!";
  let payment = data.payment ? "Has Payed" : "Has Not Payed!";

  //   TODO: Handle pushing data
  // Handle route to profile
  function toProfile() {

  }

  // Tries to send the edits to the backend
  function submitEdit() {

  }

  // Will display a modal for link for now
  function imageHandle() {

  }

  // TODO: PDF Upload?
  function waiverHandle() {
    return null
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {/* TODO: Handle route to prifile page */}
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {data.name}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {img}
        <Button onClick={props.onHide}>Upload Image</Button>
        {/* TODO: Upload image button */}
        <Table responsive>
          <tbody>
            <tr>
              {/* Name */}
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon3">Name:</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control id="Name" placeholder={data.name} />
              </InputGroup>
            </tr>
            <tr>
              {/* Email */}
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon3">Email:</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control id="Email" placeholder={null} />
              </InputGroup>
            </tr>
            <tr>
              {/* TODO: Waiver and Payment buttons */}
            </tr>
          </tbody>
        </Table>

        {/* TODO: DEBUG */}
        {JSON.stringify(data)}
      </Modal.Body>

      <Modal.Footer>
        {/* TODO: Handle waiver */}
        <Button href={waiver}>Download Waiver</Button>
        {/* TODO: Handle server call and route to profile page */}
        <Button onClick={props.onHide}>Submit</Button>
        {/* TODO: Handle route to prifile page */}
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProfileEdit;
