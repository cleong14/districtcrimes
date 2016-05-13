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
                background: '#FFF',
                color: 'black',
                margin: 'auto'
              },
              overlay: {
                backgroundColor: 'rgba(55,46,59, 0.75)' //rgb version of #372E3B, with half opacity
              }
            }}
          >

            <div class="modal">
              <h1>Welcome to District Crimes!</h1>
              <img src="../../img/team_3973x2347.jpg" />
              <p>Left to right: Chaz Leong, Theo Tran, Kevin White, Jesse Copeland (instructor)</p>
              <h5>Chaz, Theo, and Kevin graduated from DevLeague Coding Bootcamp in April, 2016.  Their capstone project, Disctrict Crimes, is intended to visualize public data in order to help the citizens of Hawaii understand troubled areas and to reach the local legislators who are best placed to effect change.</h5>
              <button id="close-button" onClick={this.closeModal}><strong>Close</strong></button>
            </div>
          </Modal>
        </div>
      );

    // }
  }
});

module.exports = AboutModal;
