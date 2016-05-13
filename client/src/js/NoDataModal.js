var React = require('react');
var ReactDOM = require('react-dom');
var Modal = require('react-modal');

var NoDataModal = React.createClass({

  getInitialState: function() {
    return { modalIsOpen: false };
  },

  openModal: function() {
    this.setState({modalIsOpen: true});
  },

  afterOpenModal: function() {
    // references are now sync'd and can be accessed.
  },

  closeModal: function() {
    this.setState({modalIsOpen: false});
  },

  render: function() {
    // if (this.props.districtInfo) {
      return (
        <div>
          <Modal
            districtInfo={this.props.districtInfo}
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={{
              content: {
                background: "#FFF",
                color: "black",
                margin: "auto"
              },
              overlay: {
                backgroundColor: 'rgba(55,46,59, 0.75)',
              }
            }}
          >

            <div class="modal">
              <h1>Oh Noes!</h1>
              <h5>You've reached a district with no data.  Why is there no data?  Great question!  HPD's crime data API is somewhat... inconsistent...</h5>
              <h5>Help us provide you with better data by contacting the legislator for this district! Let him or her know that you want the State of Hawaii to provide quality data for public consumption!  Start with the Guvna!  Huzzah!</h5>
              <h3>State of Hawaii</h3>
              <img src={this.props.districtInfo.politician_picture} height="151" width="121" />
              <h3>{this.props.districtInfo.politician_position} {this.props.districtInfo.politician_firstname} {this.props.districtInfo.politician_lastname}</h3>
              <h5>TEL: {this.props.districtInfo.contact_phone}</h5>
              <h5>E-mail: {this.props.districtInfo.contact_email}</h5>
              <h5>Party Affiliation: {this.props.districtInfo.politician_party}</h5>
              <button id="close-button" onClick={this.closeModal}><strong>Close</strong></button>
            </div>
          </Modal>
        </div>
      );

    // }
  }
});

module.exports = NoDataModal;
