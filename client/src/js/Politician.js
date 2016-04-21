var React = require('react');

var Politician = React.createClass({
  //this is the Summary module to be exported. Put all code in here.

  getInitialState: function() {
    return {

    };
  },

  getDefaultProps: function () {
    return {
      // districtData: {}
    };
  },

  componentWillMount: function() {

  },

  componentDidMount: function() {

  },

  componentWillReceiveProps: function(newProps) {
    this.getDistrictInfo(newProps);
  },

  componentWillUnmount: function() {
  },

  componentDidUpdate: function () {

  },

  getDistrictInfo: function (newProps) {
    if (newProps.districtData) {
      var chamber = newProps.districtData[newProps.chamber];
      for (var i=0; i < chamber.length; i++) {
        if (chamber[i].district_name === newProps.districtNumber) {
          this.setState({districtInfo: chamber[i]});
        }
      }
    }
  },

  buildTheDiv: function (districtInfo) {
    if (districtInfo) {
      return (
        <div>
          <h4>{districtInfo.politician_position} {districtInfo.politician_firstname} {districtInfo.politician_lastname}</h4>
          <img id="photo" src={districtInfo.politician_picture} height="151" width="121" />
          <p><strong>{districtInfo.politician_officetype} District {districtInfo.district_name}</strong></p>
          <p>Contact your {districtInfo.politician_position} about crime in your district.</p>
          <p>TEL: {districtInfo.contact_phone}</p>
          <p>E-mail: <a href={districtInfo.contact_email}>{districtInfo.contact_email}</a></p>
          <p>Party Affiliation: {districtInfo.politician_party}</p>
        </div>
      );
    }
  },

  render: function() {
    // return our JSX that is rendered to the DOM
    // var districtInfo = this.state.districtInfo;
      return (
        <div id="politician">
          {this.buildTheDiv(this.state.districtInfo)}
        </div>
      );
  }

});

module.exports = Politician;
