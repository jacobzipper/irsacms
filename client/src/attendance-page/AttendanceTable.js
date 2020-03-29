import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import AdminView from "../admin-view-page/AdminView";
import AdminEdit from "../admin-edit-page/AdminEdit";
import Button from "react-bootstrap/Button";
// import AttendanceModal from "./AttendanceModal";

// TODO: make this a functional component
class AttendanceTable extends React.Component {

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
    // Gives IDs of currently selected rows as an array
    // Array is ordered by order of which the checkbox is clicked
    console.log(this.node.selectionContext.selected);
  }


  render() {
    // event handler for clicking on a row
    const rowEvents = {
      // onClick: (e, row, rowIndex) => {
      //   this.setState({
      //     ...this,
      //     modalShow:true,
      //     lastSelectedStudent : row,
      //     })
      // }
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
      // },
      // {
      //   dataField: 'attendance',
      //   text: 'Attendance',
      //   formatter: function check(cell, row) {
      //     return (<input type="checkbox"></input>);
      //   },
      //   isDummyField: true
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
          striped
          hover
          bootstrap4
        />
        {/* <AttendanceModal
          show={this.state.modalShow}
          onHide={() => this.setModalShow(false)}
          data={this.state.lastSelectedStudent}
        /> */}
        <Button>Cancel</Button>{' '}
        <Button onClick={ this.updateAttendance }>Submit</Button>
      </>
    );
  }
}
      
export default AttendanceTable;