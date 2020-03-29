import React from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { Jumbotron } from "react-bootstrap";
// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
// import "bootstrap/dist/css/bootstrap.css";

function AdminEdit(props) {
  // DEBUG
  let data = {
    id: 8,
    name: "Bill Euler",
    img: null,
    reg: "2019-02-20T00:00:00.000Z",
    waiver: false,
    payment: true,
    username: "beuler1"
  };
  // let data = props.data ? props.data : {}; // prevents null ptr exception.

  // Handles data conditionals
  // TODO: Use <Image> tag

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

  let img = data.img ? (
    <img src={data.img} alt="Profile Image" />
  ) : (
    <p>No Image Found!</p>
  );
  let waiver = data.waiver ? "Has Waiver" : "Does Not Have Waiver!";
  let payment = data.payment ? "Has Payed" : "Has Not Payed!";
  let attendance = data.date ? IdiomaticReactList(data.date) : "Not yet attended";

  // TODO: Handle buttons
  function handleCancel(e) {
    console.log("adminEdit.cancel");
  }
  function handleDelete(e) {
    console.log("adminEdit.delete");
  }
  function handleImage(e) {
    console.log("adminEdit.image");
  }
  function handleSubmit(e) {
    console.log("adminEdit.submit");
  }
  function handleWaiver(e) {
    console.log("adminEdit.waiver");
  }

  return (
    <Jumbotron>
      <h1>{data.name}</h1>
      {img}
      <Button onClick={handleImage} className="p-1">Upload Image</Button>
      {/* TODO: edit date */}
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
              <Form.Control id="Email" placeholder={data.username} />
            </InputGroup>
          </tr>
          <tr>
            {/* TODO: Waiver default handling */}
            <label>Has Waiver: </label> <input type="checkbox"></input>
          </tr>
          <tr>
            {/* TODO: Payment default handling */}
            <label>Has Payed: </label> <input type="checkbox"></input>
          </tr>
        </tbody>
      </Table>
      {/* TODO: Add button functionality */}
      <Button onClick={handleWaiver}>?Upload Waiver?</Button>{" "}
      <Button onClick={handleSubmit}>?Submit?</Button>{" "}
      <Button onClick={handleCancel}>?Cancel?</Button>{" "}
      <Button onClick={handleDelete}>?Delete Student?</Button><br/>
      {/* TODO: DEBUG */}
      {JSON.stringify(data)}
    </Jumbotron>
  );
}

export default AdminEdit;
