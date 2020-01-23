import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Table from "react-bootstrap/Table";

// This will return the data from the backend
function updateData() {
  data = [
    {
      id: 1337,
      name: "test1",
      info: "test2"
    },
    {
      id: 1456,
      name: "test3",
      info: "test4"
    },
    {
      id: 1066,
      name: "test5",
      info: "test6"
    }
  ];
}

// The data exists here. Needs to be updated on app load
var data = updateData();

// Gets data and makes a row
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

// Will create a sortable table with a row for each data element
class UserTable extends React.Component {
  // TODO: Implement sorting
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

// fetches the data and makes a table for it
function App() {
  updateData();
  return (
    <div className="m-4">
      <UserTable />
    </div>
  );
}

export default App;
