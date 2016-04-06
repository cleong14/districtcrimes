var React = require('react');
var ReactDOM = require('react-dom');
// require our Map React component
var Map = require('./Map');
var Filter = require('./Filter');
var Summary = require('./Summary');
var Dashboard = require('./Dashboard');

// where in the actual DOM to mount our App
var mountNode = document.getElementById('app');

// App component
var App = React.createClass({
  getInitialState: function () {//we set it to state because its subject to change
    return {
      crimes: [],
      types: ['theft', 'robbery'],
      filter: [],
      chamber: 'senate'
    };

  },
  loadCrimesFromServer: function () {//added

    $.ajax({
      url: this.props.url,
      method: "GET",
      dataType: "json",
      success: (data) => {
        this.setState({crimes: data});//setting state of app to have crimes as data
      },
      failure: function (err) {
        // console.log(err);
      }
    });
  },
  loadFile: function (fileName, label) {
    var newState = {};
    $.ajax({
      url: 'http://localhost:3000/file/'+fileName,
      method: "GET",
      dataType: "json",
      success: (data) => {
        newState[label] = data;
        this.setState(newState);//setting state of app to have crimes as data
      },
      failure: function (err) {
        // console.log(err);
      }
    });
  },
  componentDidMount: function () {//added
    this.loadFile('hssd.geo.json', 'senate');
    this.loadFile('district-data.json', 'districtData');
    this.loadFile('hshd.geo.json', 'house');
    // this.loadCrimesFromServer();
  },
  toggleFilter: function (type) {//triggers a render for this component, passing toggleFilter down to CheckBoxes
    this.setState({filter: this.state.filter.concat(type)});//concat state filter with 7
    //main thing is you can change filter in this function

    //if youre given an array with the "types", given a new type , if its in the array then remove from array then setState
    //but if its not in array then you want to concat into array, then setState

    //write some logic to add into the array, and remove, should only have about 2 things in array
    console.log('toggling', type);
  },

  updateChamber: function (val) {
    this.setState({
      chamber: val
    });
  },

  render: function() {
    return (
      <div>
        <Filter
          crimes={this.state.crimes}
          types={this.state.types}
          onChange={this.toggleFilter}
          updateChamber={this.updateChamber}
        />
        <Map
          chamber={this.state.chamber}
          house={this.state.house}
          senate={this.state.senate}
          districtData={this.state.districtData}
        />
        <Summary />
        <Dashboard />
      </div>
    );
  }
});

// render the app using ReactDOM!
ReactDOM.render(
  <App url="http://localhost:3000/api" />,
  mountNode
);