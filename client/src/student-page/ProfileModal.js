import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from 'react-bootstrap/Table'

function ProfileModal(props) {
  let data = props.data ? props.data : {}; // prevents null ptr exception.
  // Handles data conditionals
  let img = data.img ? <img src={data.img} alt='Profile Image' height='128px' width='128px'/> : <p>No Image Found!</p>;
  let waiver = data.waiver ? 'Has Waiver' : 'Does Not Have Waiver!';
  let payment = data.payment ? 'Has Payed' : 'Has Not Payed!';
  let attendance = data.attendance ? data.attendance : 0;
  let waiverbytes = data.waiverbytes ? data.waiverbytes : null;

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

  function _arrayBufferToBase64( buffer ) {
    var res = "";
    var len = buffer.length;
    for (var i = 0; i < len; i++) {
        res += String.fromCharCode(buffer[i]);
    }
    return res;
}

function showFile(blob) {
  // It is necessary to create a new blob object with mime-type explicitly set
  // otherwise only Chrome works like it should
  var newBlob = new Blob([blob], {type: "application/pdf"})

  // IE doesn't allow using a blob object directly as link href
  // instead it is necessary to use msSaveOrOpenBlob
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(newBlob);
    return;
  } 

  // For other browsers: 
  // Create a link pointing to the ObjectURL containing the blob.
  const blobdata = window.URL.createObjectURL(newBlob);
  var link = document.createElement('a');
  link.href = blobdata;
  link.download=data.name;
  link.click();
  setTimeout(function(){
    // For Firefox it is necessary to delay revoking the ObjectURL
    window.URL.revokeObjectURL(blobdata);
  }, 100);
}

function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {type:mime});
}

  function openPDF() {
    var dataurl = _arrayBufferToBase64(waiverbytes.data);
    var blob = dataURLtoBlob(dataurl);
    showFile(blob);
  }

  function emailStudent() {
    window.location.href = "mailto:" + data.email + "?subject=Italian Renaissance Swordsmanship Academy - Reminder";
  }


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
              <td>                
                {(() => {
                  switch (attendance) {
                    case 0: return "Not yet attended"
                    case 1:   return `${attendance} time`;
                    default:  return `${attendance} times`;
                  }
                })()}
              </td>
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
        <Button onClick={openPDF}>Download Waiver</Button> <Button onClick={emailStudent}>Email</Button><Button onClick={props.handler}>Edit Information</Button> <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProfileModal;
