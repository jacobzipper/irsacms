import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import ProfileModal from "./ProfileModal";
import ProfileEdit from "./ProfileEdit";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import AdminView from "../admin-view-page/AdminView";

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
        sort: true,
        
        // https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/basic-sort.html
        // sortFunc not necessary -- just sort by original date and format the visual output instead
        // sortFunc: (a, b, order) => {
        //   console.log(a);
        //   console.log(b);
        //   console.log(order);
        //   return Math.floor(Math.random() * 99);
        // },
        
        // https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/column-props.html#columnformatter-function
        formatter: function(cell, row){
          var dateObj = new Date(Date.parse(cell));
          var month = dateObj.getUTCMonth() + 1; //months from 1-12
          var day = dateObj.getUTCDate();
          var year = dateObj.getUTCFullYear();
          return year + "/" + month + "/" + day;
        }
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

        {/* Change to ProfileModal for alternate look */}
        <ProfileEdit
          show={this.state.modalShow}
          onHide={() => this.setModalShow(false)}
          data={this.state.lastSelectedStudent}
        />

        <AdminView />
      </>
    );
  }
}
      
export default CustomerTable;