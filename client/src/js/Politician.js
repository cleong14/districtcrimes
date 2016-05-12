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
    // this.getDistrictInfo(newProps);
  },

  componentWillUnmount: function() {
  },

  componentDidUpdate: function () {

  },

  render: function() {
    // return our JSX that is rendered to the DOM
    // var districtInfo = this.state.districtInfo;
      return (
        <div id="politician">
          <div>
            <h4>{this.props.districtInfo.politician_position} {this.props.districtInfo.politician_firstname} {this.props.districtInfo.politician_lastname}</h4>
            <img id="photo" src={this.props.districtInfo.politician_picture} height="151" width="121" />
            <p><strong>{this.props.districtInfo.politician_officetype} District {this.props.districtInfo.district_name}</strong></p>
            <p>Contact your {this.props.districtInfo.politician_position} about crime in your district.</p>
            <p>TEL: {this.props.districtInfo.contact_phone}</p>
            <p>E-mail: <a href={this.props.districtInfo.contact_email}>{this.props.districtInfo.contact_email}</a></p>
            <p>Party Affiliation: {this.props.districtInfo.politician_party}</p>
          </div>
        </div>
      );
  }

});

module.exports = Politician;
