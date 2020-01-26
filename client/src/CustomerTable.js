import React from "react";
import Table from "react-bootstrap/Table";
import ProfileModal from "./ProfileModal";
import generateSampleData from "./sampleData";


// TODO: make this a functional component
class CustomerTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalShow : false, // needed to toggle modal
      lastSelectedStudent : null, // needed to pass clicked student to modal
    };
  }
  
  // function used to toggle Profile Modal
  setModalShow = (bool) => this.setState({
    ...this,
    modalShow:bool
  })

  handleRowClick(data) {
    this.setState({
    ...this,
    modalShow:true,
    lastSelectedStudent : data,
    })
  }

  // TODO: make backend api call to update state
  // This will fetch latest customer from backend
  fetchCustomerList() {
    this.data = generateSampleData();
  }
  
  // given an object represnting info of a single customer,
  // return a formatted row for the table
  makeTableRow(rowData) {
    return (
      <tr onClick={() => this.handleRowClick(rowData)}>
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

      <ProfileModal
        show={this.state.modalShow}
        onHide={() => this.setModalShow(false)}
        data={this.state.lastSelectedStudent}
      />

    </>
    );
  }
}
      
export default CustomerTable;