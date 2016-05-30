var React = require('react');
var ReactDOM = require('react-dom');
var Modal = require('react-modal');
var Map = require('./Map');
var Filter = require('./Filter');
// var LineChart = require('./LineChart');
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
      currentlySelectedChamber: 'senate',
      districtNumber: 0,
      senateCrimes: [],
      houseCrimes: [],
      filteredSenateCrimes: [],
      filteredHouseCrimes: [],
      currentlySelectedDistrictInfo: {
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
      },
      config: {
        params: {
          center: [21.477351, -157.962799],
          zoomControl: false,
          zoom: 10,
          // maxZoom: 19,
          // minZoom: 11,
          scrollWheelZoom: false,
          legends: true,
          infoControl: false,
          attributionControl: true
        },
        tileLayer: {
          url: 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
          params: {
            minZoom: 5,
            attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            id: 'mapbox.light',
            accessToken: 'pk.eyJ1Ijoia3doaXRlanIiLCJhIjoiY2ltNXdqdGFwMDFzanRzbTRwOW52N2syZCJ9.8tgIWcf7d9ZyJ3gjtOssaQ'
          }
        },
        colors: {
          house: {
            level1: '#eff3ff',
            level2: '#c6dbef',
            level3: '#9ecae1',
            level4: '#6baed6',
            level5: '#3182bd',
            level6: '#08519c'
          },
          senate: {
            level1: '#fee5d9',
            level2: '#fcbba1',
            level3: '#fc9272',
            level4: '#fb6a4a',
            level5: '#de2d26',
            level6: '#a50f15'
          }
        },
        crimeLevels: {
          house: {
            level1: 1,
            level2: 100,
            level3: 250,
            level4: 500,
            level5: 800,
            level6: 1500
          },
          senate: {
            level1: 1,
            level2: 100,
            level3: 250,
            level4: 500,
            level5: 1000,
            level6: 2500
          }
        }
      }
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
    this.loadFile('hssd.geo.json', 'senateGEOJSON');
    this.loadFile('district-data.json', 'districtData');
    this.loadSenateCrimes();
    this.loadHouseCrimes();
    this.loadFile('hshd.geo.json', 'houseGEOJSON');
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
      currentlySelectedChamber: val
    });
  },
  updateDistrictNumber: function (number) {
    this.setState({
      districtNumber: number
    });
  },

  updateDistrictInfo: function (number) {
    var currentlySelectedDistrictInfo;
    for (var i in this.state.districtData[this.state.currentlySelectedChamber]) {
      if (this.state.districtData[this.state.currentlySelectedChamber][i].district_name === number) {
        currentlySelectedDistrictInfo = this.state.districtData[this.state.currentlySelectedChamber][i];
      }
    }
    this.setState({
      currentlySelectedDistrictInfo: currentlySelectedDistrictInfo
    });
  },

  openAboutModal: function() {
    this.refs['about'].openModal();
  },

  render: function() {
    return (
      <div className="container">
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
            config={this.state.config}
            chamber={this.state.currentlySelectedChamber}
            house={this.state.houseGEOJSON}
            senate={this.state.senateGEOJSON}
            districtData={this.state.districtData}
            districtInfo={this.state.currentlySelectedDistrictInfo}
            updateDistrictNumber={this.updateDistrictNumber}
            updateDistrictInfo={this.updateDistrictInfo}
            districtNumber={this.state.districtNumber}
            senateCrimes={this.state.filteredSenateCrimes}
            houseCrimes={this.state.filteredHouseCrimes}
          />
          <Politician
            chamber={this.state.currentlySelectedChamber}
            districtData={this.state.districtData}
            districtInfo={this.state.currentlySelectedDistrictInfo}
            districtNumber={this.state.districtNumber}
          />
        </div>
        <div className="bottomLevel">

          <DonutChart
            filter={this.state.filter}
            districtNumber={this.state.districtNumber}
            chamber={this.state.currentlySelectedChamber}
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

/**
 <LineChart
  chamber={this.state.chamber}
  districtData={this.state.districtData}
  districtNumber={this.state.districtNumber}
  senateCrimes={this.state.filteredSenateCrimes}
  houseCrimes={this.state.filteredHouseCrimes}
  filter={this.state.filter}
/>
**/