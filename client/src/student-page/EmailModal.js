import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";


// class EmailModal extends React.Component {


// }
function EmailModal(props) {
  let data = props.data ? props.data : {}; // prevents null ptr exception.
  let textArea = null;

  function copyEmails() {
    // data.select();
    // document.execCommand('copy');
    // console.log("Copied!");
    const el = document.textArea
    el.select()
    document.execCommand("copy")
    console.log("Copied!")
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
          Emails of unpaid students
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <textarea
            ref={(textarea) => document.textArea = textarea}
            value={data}
          />
      </Modal.Body>

      <Modal.Footer>
        {/* TODO: Handle route to prifile page */}
        <Button onClick={copyEmails}>Copy</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EmailModal;
