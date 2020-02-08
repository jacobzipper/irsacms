import React from "react";
import "./App.css";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import "bootstrap/dist/css/bootstrap.css";
import CustomerTable from './CustomerTable'
import Login from './Login'
import Jumbotron from "react-bootstrap/Jumbotron";


function App() {
  return (
  <>
    <Jumbotron>
      <h1>IRSA Client Management System v0</h1>
      <p>
        Welcome to the first prototype 
      </p>
      <p>
        Clicking on a row will bring up more specific information regarding the corresponding student.
        (Notice how clicking on a row presents us with a poorly formatted blob of data.
        Expect that data to be made more readable in a later sprint.)
      </p>
        
      <p>
        In the upcoming sprint, expect this page to start looking more structured.
        (in particular, the table below wont occupy the entire screen, but rather only a part of it,
        and there will also be navigation options to navigate to other parts of the web app.)
      </p>
    </Jumbotron>

    <div className="m-4">
      <CustomerTable />
    </div>
    <div className="login">
      <Login />
    </div>
   </>
  );
}

export default App;
