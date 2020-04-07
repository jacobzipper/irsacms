import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import AdminView from "../admin-view-page/AdminView";
import AdminEdit from "../admin-edit-page/AdminEdit";
import Button from "react-bootstrap/Button";
import AttendanceModal from "./AttendanceModal";

// TODO: make this a functional component
class AttendanceTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalShow : false, // needed to toggle modal
      lastSelectedStudent : null, // needed to pass clicked student to modal
      attendanceUpdated : false // a variable used to refresh the table if attenance is updated
    };
  }
  
  // function used to toggle Profile Modal
  setModalShow = (bool) => this.setState({
    ...this,
    modalShow:bool
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

    this.setState({
      ...this,
      attendanceUpdated: !this.attendanceUpdated
    })

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
        <Button>Cancel</Button>{' '}
        <Button onClick={ this.updateAttendance }>Submit</Button>
      </>
    );
  }
}
      
export default AttendanceTable;