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
    this.refs.subtitle.style.color = '#f00';
  },

  closeModal: function() {
    this.setState({modalIsOpen: false});
  },

  render: function() {
    return (
      <div>
        <button onClick={this.openModal}>Open Modal</button>
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

          <div>
            <h1>Oh Noes!</h1>
            <h5>You've reached a district with no data.  Why is there no data?  Great question!  HPD's crime data API is somewhat... inconsistent...</h5>
            <h5>Help us provide you with better data by contacting the legislator for this district! Let him or her know that you want the State of Hawaii to provide quality data for public consumption!  Start with the Guvna!  Huzzah!</h5>
            <h3>State of Hawaii</h3>
            <img src="http://www.civilbeat.com/wp-content/uploads/2014/07/53cbafec50b27-640x960.jpg" height="151" width="121" />
            <h3>Governor David Ige</h3>
            <h5>TEL: 808-586-0034</h5>
            <h5>E-mail: gov@gov.state.hi.us</h5>
            <h5>Party Affiliation: Democrat</h5>
            <button id="close-button" onClick={this.closeModal}><strong>Close</strong></button>
          </div>
        </Modal>
      </div>
    );
  }
});

module.exports = NoDataModal;
