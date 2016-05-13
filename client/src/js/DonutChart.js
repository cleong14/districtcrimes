var React = require('react');
var ReactDOM = require('react-dom');

var DonutChartPath = React.createClass({
  propTypes: {
    width:React.PropTypes.number,
    height:React.PropTypes.number,
    data:React.PropTypes.array,
    pie:React.PropTypes.func,
    color:React.PropTypes.func
  },
  componentWillMount:function(){
    var radius=this.props.height;
    var outerRadius=radius/2;
    var innerRadius=radius/3.3;
    this
      .arc=d3.svg.arc()
      .outerRadius(outerRadius)
      .innerRadius(innerRadius);
    this
      .transform='translate('+radius/2+','+radius/2+')';
  },

  createChart:function(_self){
    var paths = (this.props.pie(this.props.data)).map(function(d, i) {
      return (
        <path fill={_self.props.color(i)} d={_self.arc(d)} key={i}/>
      )
    });
    return paths;
  },

  render:function(){
    var paths = this.createChart(this);
    return(
      <g transform={this.transform}>
        {paths}
      </g>
    )
  }
});

var DonutChartLegend=React.createClass({
    propTypes: {
        width:React.PropTypes.number,
        height:React.PropTypes.number,
        data:React.PropTypes.array,
        pie:React.PropTypes.func,
        color:React.PropTypes.func
    },
    createChart:function(_self){
        var texts = (this.props.pie(this.props.data)).map(function(d, i) {
            var transform="translate(10,"+i*30+")";
            var rectStyle = {
                fill:_self.props.color(i),
                stroke:_self.props.color(i)
            };
            var textStyle = {
                fill:_self.props.color(i)
            };
            return (
                <g transform={transform} key={i}>
                    <rect width="20" height="20" style={rectStyle} rx="2" rx="2"/>
                    <text x="30" y="15" className="browser-legend" style={textStyle}>{d.data.name}</text>
                </g>
            )
        });
        return texts;
    },
    render:function(){
      var style={
          visibility:'visible'
      };
      if(this.props.width<=this.props.height+70){
          style.visibility='hidden';
      }
      var texts = this.createChart(this);
      var transform="translate("+(this.props.width/2+80)+",55)";
      return(
          <g is transform={transform} style={style}>
              {texts}
          </g>
      )
    }
});

var DonutChart=React.createClass({
  propTypes: {
    width:React.PropTypes.number,
    height:React.PropTypes.number,
    padAngle:React.PropTypes.number,
  },
  getDefaultProps: function() {
    return {
      width: 650,
      height: 250,
      padAngle:0
    };
  },
  getInitialState:function(){
    return {
      data:[],
      width:0
    };
  },

  componentWillMount: function() {
    this.pie=d3.layout.pie()
      .value(function(d){return d.count})
      .padAngle(this.props.padAngle)
      .sort(null);
    this.color = d3.scale.category20();
    var defaultData = [
      { name: 'THEFT/LARCENY', count: 8849 },
      { name: 'BURGLARY', count: 2054 },
      { name: 'MOTOR VEHICLE THEFT', count: 1891 },
      { name: 'VANDALISM', count: 242 },
      { name: 'VEHICLE BREAK-IN', count: 5128 }
    ];
    this.setState({
      data: defaultData,
      width: this.props.width
    });
  },

  componentWillReceiveProps: function (newProps) {
    this.getCrimesPerDistrict(newProps);
  },

  componentDidUpdate: function () {
    // this.createDonutDataArray(this.state.allCrimes)
  },

  // createDonutDataArray: function (allCrimesData) {
  //   console.log(allCrimesData)
  //   for (district in allCrimesData) {
  //     console.log(Object.keys(district));
  //   }
  // },

  getCrimesPerDistrict:function(newProps) {
    // console.log(newProps);
    var allCrimes;
    var filteredCrimes;
    var _this = this;
    var result = [];
    switch (newProps.chamber) {
      case 'house':
        allCrimes = newProps.houseCrimes;
        break;
      case 'senate':
        allCrimes = newProps.senateCrimes;
        break;
    }

    if (newProps.districtNumber === 0) {
      filteredCrimes = allCrimes;
    } else {
      filteredCrimes = allCrimes
        .filter(function (glob) {
          return glob.district === newProps.districtNumber;
        });
    }

    var burglary =
      filteredCrimes
        .filter(function (glob) {
          return glob.type === "BURGLARY";
        })
        .reduce(function (all, item, index) {
          all.count += parseInt(item.count);
          return all;
        }, {name: "BURGLARY", count: 0});

    var theft =
      filteredCrimes
        .filter(function (glob) {
          return glob.type === "THEFT/LARCENY";
        })
        .reduce(function (all, item, index) {
          all.count += parseInt(item.count);
          return all;
        }, {name: "THEFT/LARCENY", count: 0});

    var vehicleBreakIn =
      filteredCrimes
        .filter(function (glob) {
          return glob.type === "VEHICLE BREAK-IN/THEFT";
        })
        .reduce(function (all, item, index) {
          all.count += parseInt(item.count);
          return all;
        }, {name: "VEHICLE BREAK-IN/THEFT", count: 0});

    var motorVehicleTheft =
      filteredCrimes
        .filter(function (glob) {
          return glob.type === "MOTOR VEHICLE THEFT";
        })
        .reduce(function (all, item, index) {
          all.count += parseInt(item.count);
          return all;
        }, {name: "MOTOR VEHICLE THEFT", count: 0});

    var vandalism =
      filteredCrimes
        .filter(function (glob) {
          return glob.type === "VANDALISM";
        })
        .reduce(function (all, item, index) {
          all.count += parseInt(item.count);
          return all;
        }, {name: "VANDALISM", count: 0});

    result.push(theft, vehicleBreakIn, vandalism, motorVehicleTheft, burglary);
    this.setState({data: result});

  },

  getCrimesByType: function (arr, type) {
    arr
      .filter(function (glob) {
        return glob.type === type;
      })
      .reduce(function (all, item, index) {
        all.count += parseInt(item.count);
        return all;
      }, {name: type, count: 0});
  },

  render:function(){
    return (
      <div id="pie-chart">
        <h4 id="total-crimes-header">TOTAL CRIMES FOR DISTRICT {this.props.districtNumber}</h4>
          <svg
            id={this.props.id}
            width={this.state.width}
            height={this.props.height}
            className="shadow"
            onClick={this.updateData}
          >
            <DonutChartPath
              width={this.state.width}
              height={this.props.height}
              pie={this.pie}
              color={this.color}
              data={this.state.data}
            />
            <DonutChartLegend
              pie={this.pie}
              color={this.color}
              data={this.state.data}
              width={this.state.width}
              height={this.props.height}
            />
          </svg>
      </div>
    );
  }
});


module.exports = DonutChart;