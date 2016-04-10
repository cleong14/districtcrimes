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
  },

  componentWillUnmount: function() {
  },

  getDistrictInfo: function (districtNumber) {
    if (this.props.districtData) {
      var chamber = this.props.districtData[this.props.chamber];
      for (var i=0; i < chamber.length; i++) {
        if (chamber[i].district_name === districtNumber) {
          return chamber[i];
        }
      }
    }
  },

  render: function() {
    // return our JSX that is rendered to the DOM
    if (this.props.districtData) {
      var districtInfo = this.getDistrictInfo(this.props.districtNumber);
      return (
        <div id="summary">
          <div id="politician">
            <img id="photo" src={districtInfo.politician_picture}/>
            <h4>{districtInfo.politician_firstname} {districtInfo.politician_lastname}</h4>
            <p>TEL: {districtInfo.contact_phone}</p>
            <p>E-mail: <a href={districtInfo.contact_email}>{districtInfo.contact_email}</a></p>
          </div>
        </div>
      );
    }
    return null;
  }

});

// export our Summary component so that Browserify can include it with other components that require it
module.exports = Summary;



// var Politician = React.createClass({
//   componentWillReceiveProps: function(newProps) {
//     console.log(newProps);
//     this.getPhotoUrl(newProps.districtNumber);
//   },

//   getPhotoUrl: function (districtNumber) {
//     if (this.props.districtData) {
//       var url;
//       for (var i=0; i < this.props.districtData[this.props.chamber].length; i++) {
//         if (this.props.districtData[this.props.chamber][i].district_name === districtNumber) {
//           url = this.props.districtData[this.props.chamber][i].politician_picture;
//         }
//         break;
//       }
//       console.log(url);
//       return url;
//     }
//   },

//   render: function () {
//     return (
//       <div>
//         <img src={} />
//       </div>
//     )
//   }
// });