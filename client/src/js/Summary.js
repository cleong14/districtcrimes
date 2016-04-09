var React = require('react');
var ReactD3 = require('react-d3-components');
var LineChart = ReactD3.LineChart;
var Brush = ReactD3.Brush;

var data = [
  {
  label: 'somethingA',
  values: [{x: 0, y: 2}, {x: 1.3, y: 5}, {x: 3, y: 6}, {x: 3.5, y: 6.5}, {x: 4, y: 6}]
  },
  {
  label: 'somethingB',
  values: [{x: 0, y: 3}, {x: 1.3, y: 4}, {x: 3, y: 7}, {x: 3.5, y: 8}, {x: 4, y: 7}]
  },
  {
  label: 'somethingC',
  values: [{x: 0, y: 4}, {x: 1.3, y: 3}, {x: 3, y: 7}, {x: 3.5, y: 2}, {x: 4, y: 9}]
  },
  {
  label: 'somethingD',
  values: [{x: 0, y: 0}, {x: 1.3, y: 2}, {x: 3, y: 4}, {x: 3.5, y: 6}, {x: 4, y: 10}]
  }
];

var Summary = React.createClass({
  //this is the Summary module to be exported. Put all code in here.

  getInitialState: function() {
    // TODO: if we wanted an initial "state" for our map component we could add it here
    console.log(LineChart);
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
      console.log(districtInfo);
      return (
        <div id="summary">
          <div id="politician">
            <img id="photo" src={districtInfo.politician_picture}/>
            <h4>{districtInfo.politician_firstname} {districtInfo.politician_lastname}</h4>
            <p>TEL: {districtInfo.contact_phone}</p>
            <p>E-mail: <a href={districtInfo.contact_email}>{districtInfo.contact_email}</a></p>
          </div>

          <LineChart
            data={data}
            width={40%}
            height={400}
            margin={{top: 10, bottom: 50, left: 50, right: 10}}
          />
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

// select date, date_trunc('week',date) as timestamp
// FROM crimes
// GROUP BY date, date_trunc('week',date)
// ORDER BY date;

// 'SELECT ' +
//       '"type", "senateDistrict", COUNT("crime"."type") AS "count" ' +
//     'FROM ' +
//       '"crimes" AS "crime" ' +
//     'GROUP BY ' +
//       '"type", "senateDistrict" ' +
//     'ORDER BY ' +
//       'type'

