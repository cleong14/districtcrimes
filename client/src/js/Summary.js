var React = require('react');

var Summary = React.createClass({
  //this is the Summary module to be exported. Put all code in here.

  getInitialState: function() {
    // TODO: if we wanted an initial "state" for our map component we could add it here
    return {

    };
  },

  componentWillMount: function() {

    // code to run just before adding the map

  },

  componentDidMount: function() {
  },

  componentWillReceiveProps: function(newProps) {
    console.log(newProps);
    this.getPhotoUrl(newProps.districtNumber);
  },

  componentWillUnmount: function() {
  },

  getPhotoUrl: function (districtNumber) {
    if (this.props.districtData) {
      var url;
      for (var i=0; i < this.props.districtData[this.props.chamber].length; i++) {
        if (this.props.districtData[this.props.chamber][i].district_name === districtNumber) {
          url = this.props.districtData[this.props.chamber][i].politician_picture;
        }
        break;
      }
      console.log(url);
      return url;
    }
  },

  render: function() {
    // return our JSX that is rendered to the DOM
    if (this.props.districtData) {
      return (
        <div id="summary">
          <h1>I AM THE Summary</h1>
        </div>
      );
    }
    return null;
  }

});

// export our Summary component so that Browserify can include it with other components that require it
module.exports = Summary;

var Politician = React.createClass({
  render: function () {
    return (
      <div>
      </div>
    )
  }
});