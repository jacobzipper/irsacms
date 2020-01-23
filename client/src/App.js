import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Table from "react-bootstrap/Table";

class UserRow extends React.Component {
  state = {
    imageUrl: 'https://picsum.photo/100'
  };
  
  render() {
    return (
      <tr>
        <td>1</td>
        <td><img src={this.state.imageUrl}  alt="" /></td>
        <td>test</td>
        <td>test</td>
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
          <UserRow />
          <UserRow />
          <UserRow />
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
