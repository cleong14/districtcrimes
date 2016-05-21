var React = require('react');
var ReactDOM = require('react-dom');
var Modal = require('react-modal');
// require our Map React component
var Map = require('./Map');
var Filter = require('./Filter');
var LineChart = require('./LineChart');
var Politician = require('./Politician');
var DonutChart = require('./DonutChart');
var AboutModal = require('./AboutModal');

// var host = require('./host');

// where in the actual DOM to mount our App
var mountNode = document.getElementById('app');
// App component
var App = React.createClass({
  getInitialState: function () {//we set it to state because its subject to change
    return {
      types: ['THEFT/LARCENY', 'VEHICLE BREAK-IN/THEFT', 'VANDALISM', 'MOTOR VEHICLE THEFT', 'BURGLARY' ],
      filter: ['THEFT/LARCENY', 'VEHICLE BREAK-IN/THEFT', 'VANDALISM', 'MOTOR VEHICLE THEFT', 'BURGLARY'],
      chamber: 'senate',
      districtNumber: 0,
      senateCrimes: [],
      houseCrimes: [],
      filteredSenateCrimes: [],
      filteredHouseCrimes: [],
      districtInfo: {
        "legislator_number": 28,
        "legislator_year": "2016",
        "legislator_type": "State",
        "politician_officetype": "State",
        "politician_position": "Governor",
        "politician_party": "Democrat",
        "politician_picture": "http://www.civilbeat.com/wp-content/uploads/2014/07/53cbafec50b27-640x960.jpg",
        "politician_firstname": "David",
        "politician_lastname": "Ige",
        "address_street": "Hawaii State Capitol",
        "address_room": "Executive Chambers",
        "contact_phone": "808-586-0034",
        "contact_fax": "808-586-0006",
        "contact_email": "gov@gov.state.hi.us",
        "contact_links": "http://governor.hawaii.gov/contact-us/contact-the-governor/",
        "district_name": 0
      }
      // districtData: []
    };
  },

  loadSenateCrimes: function () {//added
    $.ajax({
      url: '/senatecrimequery',
      method: "GET",
      dataType: "json",
      success: (data) => {
        this.setState({
          senateCrimes: data[0],
          filteredSenateCrimes: data[0]
        });
      },
      failure: function (err) {
        // console.log(err);
      }
    });
  },
  loadHouseCrimes: function () {//added
    $.ajax({
      url: '/housecrimequery',
      method: "GET",
      dataType: "json",
      success: (data) => {
        this.setState({
          houseCrimes: data[0],
          filteredHouseCrimes: data[0]
        });
      },
      failure: function (err) {
        // console.log(err);
      }
    });
  },
  loadFile: function (fileName, label) {
    var newState = {};
    $.ajax({
      url: '/file/'+fileName,
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
    this.loadSenateCrimes();
    this.loadHouseCrimes();
    this.loadFile('hshd.geo.json', 'house');
  },

  // componentWillReceiveProps: function() {
  //   // this.filterCrimes(this.state.senateCrimes);
  // },

  componentWillUpdate: function (newProps) {
  },

  componentDidUpdate: function () {
    // this.filterCrimes(this.state.senateCrimes);
  },

  filterCrimes: function (filterArr, senateCrimeData, houseCrimeData) {
    if (senateCrimeData && houseCrimeData) {
      var _this = this;
      var senateFilteredCrimes = senateCrimeData
        .filter(function (crime) {
          return filterArr.indexOf(crime.type) > -1;
        });

      var houseFilteredCrimes = houseCrimeData
        .filter(function (crime) {
          return filterArr.indexOf(crime.type) > -1;
        });

      // this is the bottle neck!!!
      this.setState({
        filter: filterArr,
        filteredSenateCrimes: senateFilteredCrimes,
        filteredHouseCrimes: houseFilteredCrimes
      }, () => {
        // console.log(this.state);
      });

    }
  },

  getDistrictInfo: function (districtNumber) {
    if (this.state.districtData) {
      for (var i in this.state.districtData[this.state.chamber]) {
        if (this.state.districtData[this.state.chamber][i].district_name === districtNumber) {
          this.setState({
            districtInfo: this.state.districtData[this.state.chamber][i]
          });
        }
      }
    }
  },

  toggleFilter: function (type) {
    var newArr = this.state.filter.slice();//copy array
    if (newArr.indexOf(type) === -1) {//checking to see if in array
      newArr = newArr.concat(type);//concat state filter with types
    } else {
      for (var i = 0; i < newArr.length; i++) {//else then remove it once clicked again
        if (newArr[i] == type) {
          newArr.splice(i, 1);
        }
      }
      // this.setState({filter: newArr});//update state
    }
    this.filterCrimes(newArr, this.state.senateCrimes, this.state.houseCrimes);
  },

  updateChamber: function (val) {
    this.setState({
      chamber: val
    });
  },
  updateDistrictNumber: function (number) {
    this.setState({
      districtNumber: number
    });
  },

  updateDistrictInfo: function (number) {
    var districtInfo;
    for (var i in this.state.districtData[this.state.chamber]) {
      if (this.state.districtData[this.state.chamber][i].district_name === number) {
        districtInfo = this.state.districtData[this.state.chamber][i];
      }
    }
    this.setState({
      districtInfo: districtInfo
    });
  },

  openAboutModal: function() {
    console.log("Why you no open?");
    this.refs['about'].openModal();
  },

  render: function() {
    return (
      <div class="container">
        <div className="banner">
          <div id="logo">
            <div id="title">
              <h3>DISTRICT</h3>
            </div>
            <div id="title2">
              <h3>CRIMES</h3>
            </div>
            <div id="picture">
              <img id="eye-logo" src="../../img/medical.png" height="70" width="70"></img>
            </div>
            <div>
              <button onClick={this.openAboutModal}>ABOUT</button>
            </div>
          </div>
        </div>
        <div className="topLevel">
          <AboutModal
            ref="about"
          ></AboutModal>
          <Filter
            types={this.state.types}
            onChange={this.toggleFilter}
            updateChamber={this.updateChamber}
            updateDistrictNumber={this.updateDistrictNumber}
            filter={this.state.filter}
            filterCrimes={this.filterCrimes}
          />
          <Map
            chamber={this.state.chamber}
            house={this.state.house}
            senate={this.state.senate}
            districtData={this.state.districtData}
            districtInfo={this.state.districtInfo}
            updateDistrictNumber={this.updateDistrictNumber}
            updateDistrictInfo={this.updateDistrictInfo}
            districtNumber={this.state.districtNumber}
            senateCrimes={this.state.filteredSenateCrimes}
            houseCrimes={this.state.filteredHouseCrimes}
          />
          <Politician
            chamber={this.state.chamber}
            districtData={this.state.districtData}
            districtInfo={this.state.districtInfo}
            districtNumber={this.state.districtNumber}
          />
        </div>
        <div className="bottomLevel">
          <LineChart
            chamber={this.state.chamber}
            districtData={this.state.districtData}
            districtNumber={this.state.districtNumber}
            senateCrimes={this.state.filteredSenateCrimes}
            houseCrimes={this.state.filteredHouseCrimes}
            filter={this.state.filter}
          />
          <DonutChart
            filter={this.state.filter}
            districtNumber={this.state.districtNumber}
            chamber={this.state.chamber}
            senateCrimes={this.state.filteredSenateCrimes}
            houseCrimes={this.state.filteredHouseCrimes}
            padAngle={0.03}
          />
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  mountNode
);