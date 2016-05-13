var React = require('react');
var ReactDOM = require('react-dom');
var Modal = require('react-modal');

var AboutModal = React.createClass({

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
                backgroundColor: '#372E3B',
              }
            }}
          >

            <div class="modal">
              <h1>Welcome to District Crimes!</h1>
              <img src="../../img/team_3973x2347.jpg" />
              <h5>This is a modal about our team.</h5>
              <button id="close-button" onClick={this.closeModal}><strong>Close</strong></button>
            </div>
          </Modal>
        </div>
      );

    // }
  }
});

module.exports = AboutModal;
