import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

function AdminEdit(props) {
  let data = props.data ? props.data : {}; // prevents null ptr exception.

  // Handles data conditionals
  let img = data.img ? (
    <img src={data.img} alt="Profile Image" height='128px' width='128px'/>
  ) : (
    <p>No Image Found!</p>
  );


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

  // let waiverText = data.waiver ? "Has Waiver" : "Does Not Have Waiver!";
  // let paymentText = data.payment ? "Has Payed" : "Has Not Payed!";
  let waiver = data.waiver ? data.waiver : null;
  let payment = data.payment ? data.payment : null;
  let attendance = data.date ? IdiomaticReactList(data.date) : "Not yet attended";
  let waiverbytes = data.waiverbytes ? data.waiverbytes : null;
  var updatedName = null;
  var updatedEmail = null;
  var updatedWaiverCheckbox = data.waiver ? data.waiver : null;
  var updatedPaymentCheckbox = data.payment ? data.payment : null;
  // let name = data.name ? data.name : null;
  // let email = data.email ? data.email : null;
  // let username = data.username ? data.username : null;

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

    
    // open in new tab (not fully functional)
    // // var imageurl = "<img src='" + dataurl + "'/>"
    // var pdfurl = "<iframe src='" + dataurl + "' width='100%' height='100%' />";
    // var w = window.open("");
    // w.document.write(pdfurl);
  }

  function onAddFile(e) {

    var reader = new FileReader();
    reader.onload = function(){
      var dataURL = reader.result;
      console.log("dataURL:");
      console.log(dataURL);
      var postData = {"waiverbytes": dataURL, "waiver": data.waiver, "payment": data.payment, "name": data.name, "email": data.email, "username": data.username};

      console.log(postData);
      fetch("/api/edituser", {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData),
      })
      .then( res => res.json() )
      .then( res => {
        console.log('attempted to add file');
      });
    };
    reader.readAsDataURL(e.target.files[0]);

  }

  function handleSubmit() {

    let postEmail = data.email;
    if (updatedEmail && updatedEmail.length > 0) { // && validFormat(updatedEmail) 
      postEmail = updatedEmail;
    }
    let postName = data.name;
    if (updatedName && updatedName.length > 0) { // && validFormat(updatedName) 
      postName = updatedName;
    }

    var postData = {"waiver": updatedWaiverCheckbox, "payment": updatedPaymentCheckbox, "name": postName, "email": postEmail, "username": data.username};
    console.log("POSTDATA:");
    console.log(postData);
    fetch("/api/edituser", {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData),
    })
    .then( res => res.json() )
    .then( res => {
      console.log('attempted to edit userr');
    });
    props.handler();
  }

  function handleNameChange(event) {
    updatedName = event.target.value;
  }

  function handleEmailChange(event) {
    updatedEmail = event.target.value;
  }

  function handleWaiverChange(event) {
    updatedWaiverCheckbox = event.target.checked;
  }

  function handlePaymentChange(event) {
    updatedPaymentCheckbox = event.target.checked;
  }

  function closeModal() {
    props.handler();
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={closeModal}
    >
      {/* TODO: Handle route to prifile page */}
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {data.name}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {img}
        <Button disabled onClick={props.onHide}>Upload Image</Button>
        {/* TODO: Upload image button */}
        <Button onClick={props.onHide}>Upload Waiver</Button>
        {/* TODO: Upload image button */}
        <Table responsive>
          <tbody>
            <tr>
              {/* Name */}
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon3">Name:</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control id="Name" placeholder={data.name} onChange={handleNameChange}/>
              </InputGroup>
            </tr>
            <tr>
              {/* Email */}
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon3">Email:</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control id="Email" onChange={handleEmailChange} placeholder={null} />
              </InputGroup>
              <tr>
            {/* TODO: Waiver default handling */}
            <label>Has Waiver: </label> <input onChange={handleWaiverChange} defaultChecked={waiver} type="checkbox"></input>
            </tr>
            <tr>
              {/* TODO: Payment default handling */}
              <label>Has Payed: </label> <input onChange={handlePaymentChange} defaultChecked={payment} type="checkbox"></input>
            </tr>
              {/* TODO: Waiver and Payment buttons */}
            </tr>
          </tbody>
        </Table>

        {/* TODO: DEBUG */}
        {JSON.stringify(data)}
      </Modal.Body>

      <Modal.Footer>
        {/* TODO: Handle waiver */}
        {/* <a href={waiverbytes} target='_blank'>HELLOPLEZ</a> */}
        <input type="file" name="file" onChange={onAddFile}/><br/>
        <Button onClick={openPDF}>Download Waiver</Button>
        {/* TODO: Handle server call and route to profile page */}
        <Button onClick={handleSubmit}>Submit</Button>
        {/* TODO: Handle route to prifile page */}
        <Button onClick={closeModal}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AdminEdit;
