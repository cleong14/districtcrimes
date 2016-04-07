var React = require('react');
var ReactDOM = require('react-dom');
// require our Map React component
var Map = require('./Map');
var Filter = require('./Filter');
var Summary = require('./Summary');
var Dashboard = require('./Dashboard');
var update = require('react-addons-update');

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
    this.loadCrimesFromServer();
    console.log('get picture?');
    this.getPolitician();

  },

  componentWillReceiveProps: function() {
  },

  toggleFilter: function (type) {
    if (this.state.filter.indexOf(type) === -1) {
      this.setState({filter: this.state.filter.concat(type)});//concat state filter with types
    } else {
      var newArr = this.state.filter.slice();//copy array
      for (var i = 0; i < newArr.length; i++) {
        if (newArr[i] == type) {
          newArr.splice(i, 1);
        }
      }
      this.setState({filter: newArr});//update state
    }
  }, 
  updateChamber: function (val) {
    this.setState({
      chamber: val
    });
  },
  getPolitician: function () {
    // var pictureURL = '';

    // for (var i=0; i < this.state.districtData[this.state.chamber].length; i++) {
    //   if this.state.districtData[this.state.chamber]
    // }
    if (this.state.districtData) {
      console.log('running ajax...');
      $.ajax({
        url: this.state.districtData.senate[0].politician_picture,
        method: "GET",
        dataType: "json",
        success: (data) => {
          $('#photo').append(data);
        },
        failure: function (err) {
          // console.log(err);
        }
      });

    }
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
        <Summary
          chamber={this.state.chamber}
          districtData={this.state.districtData}
        />
        <Dashboard />
      </div>
    );
  }
});

// render the app using ReactDOM! url="http://localhost:3000/api"
ReactDOM.render(
  <App  />,
  mountNode
);