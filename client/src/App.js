import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Table from "react-bootstrap/Table";

// The data exists here. Needs to be updated on app load
var data;

// This will return the data from the backend
function updateData() {
  data = [{
    id: 1337,
    name: "test",
    info: "test"
  },{
    id: 1456,
    name: "test",
    info: "test"
  },{
    id: 1066,
    name: "test",
    info: "test"
  }]
}

class UserRow extends React.Component {
  i = this.props.value;
  
  render() {
    return (
      <tr onClick={() => alert("Click!!")}>
        <td> {this.i + 1} </td>
        <td> {this.data[this.i].id} </td>
        <td> {this.data[this.i].name} </td>
        <td> {this.data[this.i].info} </td>
      </tr>
    );
  }
}

class UserTable extends React.Component {
  render() {
    return (
      <Table striped bordered hover>
        <thead>
          <th>#</th>
          <th>data</th>
          <th>data</th>
          <th>data</th>
        </thead>
        <tbody>
          {Array.from(this.data.keys()).map(index => (
            <UserRow value={index} />
          ))}
        </tbody>
      </Table>
    );
  }
}

function App() {
  updateData();
  return (
    <div className="m-4">
      <UserTable />
    </div>
  );
}

export default App;
