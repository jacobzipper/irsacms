import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Table from "react-bootstrap/Table";

class UserRow extends React.Component {
  // TODO: be populated by data from backend
  data = {
    id: 1337,
    name: "test",
    info: "test"
  };

  // TODO: <tr> needs onClick()
  render() {
    return (
      <tr onClick={() => alert('Click!!')}>
        <td> {this.props.value} </td>
        <td> {this.data.id} </td>
        <td> {this.data.name} </td>
        <td> {this.data.info} </td>
      </tr>
    );
  }
}

class UserTable extends React.Component {
  // Placeholder for number of rows
  phRow = [8, 9, 3, 6, 0];
  // TODO: needs to know how many row to make
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
          {this.phRow.keys().map(index => (
            <UserRow value={index} />
          ))}
        </tbody>
      </Table>
    );
  }
}

function App() {
  return (
    <div className="m-4">
      <UserTable />
    </div>
  );
}

export default App;
