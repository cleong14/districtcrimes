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
    this.getDistrictInfo(newProps.districtNumber);
  },

  componentWillUnmount: function() {
  },

  getDistrictInfo: function (districtNumber) {
    if (this.props.districtData) {
      var chamber = this.props.districtData[this.props.chamber];
      // console.log(chamber);
      for (var i=0; i < chamber.length; i++) {
        if (chamber[i].district_name === districtNumber) {
          this.setState({districtInfo: chamber[i]});
          // console.log(this.state);
        }
      }
    }
  },

  buildTheDiv: function (districtInfo) {
    if (districtInfo) {
      return (
        <div>
          <img id="photo" src={districtInfo.politician_picture} />
          <h4>{districtInfo.politician_firstname} {districtInfo.politician_lastname}</h4>
          <p>TEL: {districtInfo.contact_phone}</p>
          <p>E-mail: <a href={districtInfo.contact_email}>{districtInfo.contact_email}</a></p>
        </div>
      );
    }
  },

  render: function() {
    // return our JSX that is rendered to the DOM
    var districtInfo = this.state.districtInfo;
    // console.log(districtInfo);
      return (
        <div id="politician">
          {this.buildTheDiv(this.state.districtInfo)}
        </div>
      );
  }

});

module.exports = Politician;
