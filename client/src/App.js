import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'

function App() {
  return (
    <div className="App">
      <Table striped bordered hover>
        <thead>
          <th>#</th>
          <th>data</th>
          <th>data</th>
          <th>data</th>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>test</td>
            <td>test</td>
            <td>test</td>
          </tr>
          <tr>
            <td>2</td>
            <td>test</td>
            <td>test</td>
            <td>test</td>
          </tr>
          <tr>
            <td>3</td>
            <td>test</td>
            <td>test</td>
            <td>test</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default App;
