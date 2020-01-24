import React from "react";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

  
class CustomerTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show : false,
    };
  }
  
  // TODO: update this component to handle state better.
  handleClose = () => this.setState({
    ...this,
    show:false
  })

  handleShow = () => this.setState({
    ...this,
    show:true
  })

  // TODO: make backend api call to update state
  // This will fetch latest customer from backend
  fetchCustomerList() {
    this.data = [
      {
        id: 1337,
        name: "test1",
        contact: "test2",
        paymentStatus: "Paid",
      },
      {
        id: 1456,
        name: "test3",
        contact: "test4",
        paymentStatus: "Paid",
      },
      {
        id: 1066,
        name: "test5",
        contact: "test6",
        paymentStatus: "Paid",
      }
    ];
  }
  
  // given an object represnting info of a single customer,
  // return a formatted row for the table
  makeTableRow(rowData) {
    return (
      <tr onClick={() => this.handleShow()}>
        <td> {rowData.id} </td>
        <td> {rowData.name} </td>
        <td> {rowData.contact} </td>
        <td> {rowData.paymentStatus} </td>
      </tr>
    );
  }

  // TODO: Implement sorting
  render() {
    this.fetchCustomerList();
    let show = this.state.show
    let handleClose = this.handleClose
    return (
      <>
      <Table striped bordered hover>

        <thead>
          <th>Customer ID: </th>
          <th>Name: </th>
          <th>Preferred Contact: </th>
          <th>Payment Status: </th>
        </thead>

        <tbody>
          { this.data.map(row => this.makeTableRow(row)) }
        </tbody>

      </Table>

      <Modal
      show={this.state.show}
      onHide={() => handleClose()}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
      </>
    );
  }
}
      
export default CustomerTable;