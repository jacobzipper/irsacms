import React from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { Jumbotron } from "react-bootstrap";


function AdminView(props) {
  // DEBUG
  let data = {"id":8,"name":"Bill Euler","img":null,"reg":"2019-02-20T00:00:00.000Z","waiver":false,"payment":true,"username":"beuler1"}
  // let data = props.data ? props.data : {}; // prevents null ptr exception.

  // Handles data conditionals
  // TODO: Use <Image> tag
  // TODO: Have a default no image
  let img = data.img ? (
    <img src={data.img} alt="Profile Image" />
  ) : (
    <p>No Image Found!</p>
  );
  let waiver = data.waiver ? "Has Waiver" : "Does Not Have Waiver!";
  let payment = data.payment ? "Has Payed" : "Has Not Payed!";

  // TODO: handle buttons
  function handleBack(e) {
    console.log('adminView.back');
  }
  function handleEdit(e) {
    console.log('adminView.edit');
  }
  function handleWaiver(e) {
    console.log('adminView.waiver');
  }
  function handleContact(e) {
    console.log('adminView.contact');
  }

  return (
    <Jumbotron>
      <h1>{data.name}</h1>
      {img}
      <Table responsive>
        <tbody>
          <tr>
            <td>
              <b>Name:</b>
            </td>
            <td>{data.name}</td>
          </tr>
          <tr>
            <td>
              <b>Registration Date:</b>
            </td>
            <td>{data.reg}</td>
          </tr>
          <tr>
            <td>
              <b>Waiver Status:</b>
            </td>
            <td>{waiver}</td>
          </tr>
          <tr>
            <td>
              <b>Payment Status:</b>
            </td>
            <td>{payment}</td>
          </tr>
        </tbody>
      </Table>
      
      {/* TODO: Add button functionality */}
      <Button onClick={handleWaiver}>?Waiver?</Button>{' '}
      <Button onClick={handleContact}>?Contact?</Button>{' '}
      <Button onClick={handleEdit}>?Edit?</Button>{' '}
      <Button onClick={handleBack}>?Back?</Button>

      {/* TODO: DEBUG */}
      {JSON.stringify(data)}
    </Jumbotron>
  );
}

export default AdminView;
