import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from 'react-bootstrap/Table'

import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';


function AttendanceModal(props) {
  let data = props.data ? props.data : {}; // prevents null ptr exception.
  

  // Handles data conditionals

  // formatting reg date
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  let regDate = new Date(data.reg).toLocaleDateString(undefined, options)

  // formatting picture
  let img = data.img ? <img src={data.img} alt='Profile Image' height='128px' width='128px'/> : <p>No Image Found!</p>;

  // formatting attendance heatmap
  let weekdaylabels = ["M","Tu","W","Th","F","Sa","Su"];
  // let startDate = new Date(data.reg);
  let startDate = new Date().setMonth( (new Date().getMonth() - 6) );
  let endDate = new Date();
  // let attendance = data.date ? data.date.map(d => { let t = {date: new Date(d)}; return t; }) : [];
  let attendance = data.date ? data.date.map(d => new Object( {date: new Date(d)} ) ) : [];
      

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
        {img}
        <Table responsive>
          <tbody>
            <tr>
              <td><b>Name:</b></td>
              <td>{data.name}</td>
            </tr>
            <tr>
              <td><b>Registration Date:</b></td>
              <td>{regDate}</td>
            </tr>
            <tr>
              <td><b>Attendance:</b></td>
              {/* <td>{attendance}</td> */}
              <td>
                  <CalendarHeatmap
                    startDate={startDate}
                    endDate={endDate}
                    values = {attendance}
                    showWeekdayLabels = {true}
                    weekdayLabels = {weekdaylabels}
                  />
              </td>
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
