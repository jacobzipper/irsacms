import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from 'react-bootstrap/Table'


function AttendanceModal(props) {
  let data = props.data ? props.data : {}; // prevents null ptr exception.

  

  function dateFormatter(dt) {
    var dateObj = new Date(Date.parse(dt));
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    return year + "/" + month + "/" + day;
  }

  function IdiomaticReactList(arr) {
    return (
      <div>
        {arr.map((item, index) => (
          <div key={item}>{dateFormatter(item)}</div>
        ))}
      </div>
    );
  }

  // Handles data conditionals
  let img = data.img ? <img src={data.img} alt='Profile Image' height='128px' width='128px'/> : <p>No Image Found!</p>;
  let attendance = data.date ? IdiomaticReactList(data.date) : "Not yet attended";

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
              <td><b>Attendance:</b></td>
              <td>{attendance}</td>
            </tr>
          </tbody>
        </Table>

        {/* {JSON.stringify(data)} */}
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AttendanceModal;
