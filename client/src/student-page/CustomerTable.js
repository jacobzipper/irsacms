import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import ProfileModal from "./ProfileModal";
import ProfileEdit from "./ProfileEdit";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import AdminView from "../admin-view-page/AdminView";
import AdminEdit from "../admin-edit-page/AdminEdit";
import Button from "react-bootstrap/Button";
import { Row, Col} from "react-bootstrap";
import Alert from 'react-bootstrap/Alert';

// TODO: make this a functional component
class CustomerTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalShow : false, // needed to toggle modal
      lastSelectedStudent : null, // needed to pass clicked student to modal
      toEmail : [], // for contacting a list of students
      modalSwitch : 0, // 0 for ProfileModal, 1 for ProfileEdit
      alertShow : false,
      showDeleteModal: false
    };

    this.contactUnpaid = this.contactUnpaid.bind(this);
    this.contactUnsigned = this.contactUnsigned.bind(this);
    this.contactSelectedStudents = this.contactSelectedStudents.bind(this);
    this.handler = this.handler.bind(this);
    this.editPageHandle = this.editPageHandle.bind(this);
    this.refreshPage = this.refreshPage.bind(this);
    this.handleDeleteModal = this.handleDeleteModal.bind(this);
  }
  
  // function used to toggle Profile Modal
  setModalShow = (bool) => this.setState({
    ...this,
    modalShow:bool
  })

  //not proud of this
  handleDeleteModal(bool) {
    console.log(this.state.showDeleteModal);
    this.setState({
      ...this,
      showDeleteModal: bool
    });
    this.setState({       ...this,
      showDeleteModal: bool }, () => {
      console.log(this.state.showDeleteModal);
    });
  }

  contactUnpaid = function(e) {
    console.log("-contactUnpaid-");
    const result = this.state.data.filter(student => student.payment == false || true);
    console.log(result);
    this.state.toEmail = result.map(student => student.email);
    // this.state.toEmail = this.state.toEmail.filter(email => email != null);
    console.log(this.state.toEmail);
    var mailtoString = this.state.toEmail.join(',');
    window.location.href = "mailto:" + mailtoString + "?subject=Italian Renaissance Swordsmanship Academy - Reminder";
  }

  contactUnsigned = function(e) {
    console.log("-contactUnsigned-");
    const result = this.state.data.filter(student => student.waiver == false || true);
    console.log(result);
    this.state.toEmail = result.map(student => student.email);
    // this.state.toEmail = this.state.toEmail.filter(email => email != null);
    console.log(this.state.toEmail);
    var mailtoString = this.state.toEmail.join(',');
    window.location.href = "mailto:" + mailtoString + "?subject=Italian Renaissance Swordsmanship Academy - Reminder";
  }

  contactSelectedStudents = function(e) {
    this.state.toEmail = this.node.selectionContext.selected.map( userId => {
      return this.state.data.filter(user => user.id == userId)[0].email;
    });
    console.log(this.state.toEmail);
    var mailtoString = this.state.toEmail.join(',');
    // TODO: &body=Hi there, it's Tony. Sign.
    window.location.href = "mailto:" + mailtoString + "?subject=Italian Renaissance Swordsmanship Academy - Reminder";
  }

  handler() {
    this.setState({
      ...this,
      modalSwitch: 1 - this.state.modalSwitch
    });
  }

  refreshPage() {
    window.location.reload(false);
  }

  editPageHandle(isSubmit) {
    if (isSubmit) {
      this.setState({
        ...this,
        modalSwitch: 1 - this.state.modalSwitch,
        modalShow: false,
        alertShow: true
      });
      this.refreshPage();
    }
    else {
      this.setState({
        ...this,
        modalSwitch: 1 - this.state.modalSwitch,
        modalShow: false
      });
    }
  }

  
  componentDidMount() {
    fetch('/api/customers')
      .then(res => res.json())
      .then( (res) => { 
        this.setState({
          ...this.state,
          data: res
        });
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
        formatter: function imageFormatter(cell, row){
          return (<img src={cell} height='64px' width='64px'/>);
        }
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
        text: 'Has waiver?',
        sort: true,
        formatter: function(cell, row) {
          if (cell) {
            return <img src="https://i.imgur.com/k8tbSRk.png" width="30px" margin="auto" padding="0"/>
          } else {
            return <img src="https://i.imgur.com/FSQ35Yq.png" width="30px" margin="auto" padding="0"/>
          }
        }
      },
      {
        dataField: 'payment',
        text: 'Has paid?',
        sort: true,
        formatter: function(cell, row) {
          if (cell) {
            return <img src="https://i.imgur.com/k8tbSRk.png" width="30px" margin="auto" padding="0"/>
          } else {
            return <img src="https://i.imgur.com/FSQ35Yq.png" width="30px" margin="auto" padding="0"/>
          }
        }
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
    
    const columns2 = [
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
      },
      {
        dataField: 'attendance',
        text: 'Attendance',
        sort: true
      }
    ];

    return (
      <>
      <Row>
        <Col>
          <Button onClick={this.contactSelectedStudents}>Contact selected</Button>
          <p></p>
        </Col>
        <Col>
          <Button onClick={this.contactSelectedStudents}>Contact unpaid</Button>
          <p></p>
        </Col>
        <Col>
          <Button onClick={this.contactSelectedStudents}>Contact unsigned</Button>
          <p></p>
        </Col>

        <Col>
        </Col>

        <Col>
        </Col>

        <Col>
        </Col>
      </Row>
        {/* <Button onClick={this.contactSelectedStudents}>Contact selected students</Button> */}
        {/* i beg of you to find a better way */}
        {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
        {/* <Button onClick={this.contactUnpaid}>Contact unpaid students</Button> */}
        {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
        {/* <Button onClick={this.contactUnsigned}>Contact unsigned students</Button> */}

        <BootstrapTable
          keyField='id'
          ref={ n => this.node = n }
          data={ this.state.data == undefined ? []: this.state.data }
          columns={ columns }
          selectRow={ { mode: 'checkbox', clickToSelect: true } }
          rowEvents={ rowEvents }
          striped
          hover
          bootstrap4
        />

        {/* Change to ProfileModal for alternate look */}
        {this.state.modalSwitch == 0 ? (
            <ProfileModal
            handler={this.handler}
            show={this.state.modalShow}
            onHide={() => this.setModalShow(false)}
            data={this.state.lastSelectedStudent}
          />
        ) : (
            <AdminEdit
            handler={this.editPageHandle}
            deleteModalHandler={this.handleDeleteModal}
            showDeleteModal={this.state.showDeleteModal}
            show={this.state.modalShow}
            onHide={() => this.setModalShow(false)}
            data={this.state.lastSelectedStudent}
            />
          //   <ProfileEdit
          //   handler = {this.editPageHandle}
          //   show={this.state.modalShow}
          //   onHide={() => this.setModalShow(false)}
          //   data={this.state.lastSelectedStudent}
          // />
        )}
      </>
    );
  }
}
      
export default CustomerTable;