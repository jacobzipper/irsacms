import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import CustomerTable from './CustomerTable'
import Jumbotron from "react-bootstrap/Jumbotron";


function App() {
  return (
  <>
    <Jumbotron>
      <h1>Hello, Army of Freds!</h1>
      <p>
        Jokes aside, this is where you will be able to see all currenly enlisted students.
        <br/>
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
   </>
  );
}

export default App;
