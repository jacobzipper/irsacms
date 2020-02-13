import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import ProfileModal from "./ProfileModal";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

// TODO: make this a functional component
class CustomerTable extends React.Component {

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

  render() {
    // column definitions
    const columns = [
      {
        dataField: 'id',
        text: 'Customer ID ',
        sort: true
      }, 
      {
        dataField: 'img',
        text: 'Picture ',
      }, 
      {
        dataField: 'name',
        text: 'Name',
        sort: true
      },
      {
        dataField: 'reg',
        text: 'Registration Date',
        sort: true
      },
      {
        dataField: 'waiver',
        text: 'Documents Pending?',
        sort: true
      },
      {
        dataField: 'payment',
        text: 'Payment Pending?',
        sort: true
      }, 
    ];

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


    return (
      <>
        <BootstrapTable
          keyField='id'
          data={ this.state.data == undefined ? []: this.state.data }
          columns={ columns }
          rowEvents={ rowEvents }
          striped
          hover
          bootstrap4
        />
        <ProfileModal
          show={this.state.modalShow}
          onHide={() => this.setModalShow(false)}
          data={this.state.lastSelectedStudent}
        />
      </>
    );
  }
}
      
export default CustomerTable;