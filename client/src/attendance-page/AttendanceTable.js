import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
// import AdminView from "../admin-view-page/AdminView";
// import AdminEdit from "../admin-edit-page/AdminEdit";
import AttendanceModal from "./AttendanceModal";

import Button from "react-bootstrap/Button";
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'





class AttendanceTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalShow : false, // needed to toggle modal
      lastSelectedStudent : null, // needed to pass clicked student to modal
      alertShow : false, // needed to toggle submit confirmation alert
      numUpdates : 0  // used in the confirmation alert to show how many students were updated
    };
  }
  
  // function used to toggle Profile Modal
  setModalShow = (bool) => this.setState({
    ...this,
    modalShow:bool
  })

  setAlertShow = (bool) => this.setState({
    ...this,
    alertShow: bool
  })

  setNumUpdates = (i) => this.setState({
    ...this,
    numUpdates : i
  })

  componentDidMount() {
    fetch('/api/customers')
      .then(res => res.json())
      .then( (res) => {
        this.setState({
          ...this.state,
          data: res
        })
      }
    );
  }

  updateAttendance  = () => {
    // sends post req to /api/attendance,
    // with the body having a list of the users selected in table

    // this.node.selectionContext is an array of the id's of currently selected customers
    // we transofrm that array into the array of usernames of corresponding user ids
    // ie [id1, id2, ..] => [username(id1), username(id2), ..]
    // eg. [1, 4, 7] =? [jackmolby1234, ...]

    let username_list = this.node.selectionContext.selected.map( userId => {
      return this.state.data.filter(user => user.id == userId)[0].username;
    });


    let username_list_payload = {"students" : username_list};
    fetch("/api/attendance", {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(username_list_payload),
    });

    // this.setState({
    //   ...this,
    //   attendanceUpdated: !this.state.attendanceUpdated
    // })
    this.setNumUpdates(username_list.length)
    this.setAlertShow(true);
  }


  render() {
    // event handler for clicking on a row
    const rowEvents = {
      onClick: (e, row, rowIndex) => {
        this.setState({
          ...this,
          modalShow:true,
          lastSelectedStudent : row,
          })
      }
    };
    
    const columns = [
      {
        dataField: 'id',
        text: 'Customer ID ',
        sort: true
      }, 
      {
        dataField: 'img',
        text: 'Picture ',
        formatter: function imageFormatter(cell, row){
          return (<img src={cell} height='64px' width='64px'/>);
        }
      }, 
      {
        dataField: 'name',
        text: 'Name',
        sort: true
      }
    ];
    
    return (
      <>
        
        
        <Container>
          <Row>

            <Col sm={10}>
              {this.state.alertShow ? (<Alert
                variant="success"
                show={this.state.alertShow}
                dismissible
                onClose={() => this.setAlertShow(false)}
              >
                  Succesfully updated attendance record of {this.state.numUpdates} student(s)! Please refresh the page to see changes.
              </Alert>) :
              (<Alert
                variant="info"
                show={!this.state.alertShow}
              >
                  Please select students to update attendance.
              </Alert>)
              }
            </Col>

            <Col>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                  <Button onClick={ this.updateAttendance }>Update</Button>
                </div>
                <p></p>
            </Col>

          </Row>
        </Container>
        {/* <Container>
          <Row>
            <Col></Col>
        <Button onClick={ this.updateAttendance }>Confirm</Button>
        </Row>
        {/* <Row> <p></p></Row> */}
        

        <BootstrapTable
          ref={ n => this.node = n }
          keyField='id'
          data={ this.state.data == undefined ? []: this.state.data }
          columns={ columns }
          selectRow={ { mode: 'checkbox', clickToSelect: true } }
          rowEvents={ rowEvents }
          striped
          hover
          bootstrap4
        />
        <AttendanceModal
          show={this.state.modalShow}
          onHide={() => this.setModalShow(false)}
          data={this.state.lastSelectedStudent}
        />

      </>
    );
  }
}
      
export default AttendanceTable;