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
        this.arc=d3.svg.arc()
            .outerRadius(outerRadius)
            .innerRadius(innerRadius);
        this.transform='translate('+radius/2+','+radius/2+')';
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
      // id:React.PropTypes.string.isRequired
  },
  getDefaultProps: function() {
      return {
          width: 550,
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
  componentWillMount:function(){
      this.pie=d3.layout.pie()
          .value(function(d){return d.count})
          .padAngle(this.props.padAngle)
          .sort(null);
      this.color = d3.scale.ordinal()
          .range(['#68c8d7','#eccd63','#bb8cdd','#de6942','#52b36e','#bbc7d9']);
      var data = [
          { name: 'THEFT/LARCENY', count: 8849 },
          { name: 'BURGLARY', count: 2054 },
          { name: 'MOTOR VEHICLE THEFT', count: 1891 },
          { name: 'VANDALISM', count: 242 },
          { name: 'VEHICLE BREAK-IN', count: 5128 }
      ];
      this.setState({'data':data,width:this.props.width});
  },

  updateData:function() {
    var senateCrime = this.props.senateCrimes;
    var houseCrime = this.props.houseCrimes;
    var district = this.props.districtNumber;

    var theftCrime = //senate
      senateCrime
        .filter(function(crime) {
          if (crime.district && crime.count) return true;
        })
        .filter(function(crime) {
          return crime.type === 'THEFT/LARCENY' && crime.district === district;
        })
        .map(function(crime) {
          return crime.count;
        });

    var houseTheftCrime = //house
      houseCrime
        .filter(function(crime) {
          if (crime.district && crime.count) return true;
        })
        .filter(function(crime) {
          return crime.type === 'THEFT/LARCENY' && crime.district === district;
        })
        .map(function(crime) {
          return crime.count;
        });

    var theftChart = theftCrime.reduce(function(total, count) {//senate
        var number = parseInt(count);
        return total + number;
    }, 0);

    var houseTheftChart = houseTheftCrime.reduce(function(total, count) {//house
        var number = parseInt(count);
        return total + number;
    }, 0);

    var burglaryCrime = //senate
      senateCrime
        .filter(function(crime) {
          if (crime.district && crime.count) return true;
        })
        .filter(function(crime) {
          return crime.type === 'BURGLARY' && crime.district === district;
        })
        .map(function(crime) {
          return crime.count;
        });

    var houseBurglaryCrime = //house
      houseCrime
        .filter(function(crime) {
          if (crime.district && crime.count) return true;
        })
        .filter(function(crime) {
          return crime.type === 'BURGLARY' && crime.district === district;
        })
        .map(function(crime) {
          return crime.count;
        });

    var burglaryChart = burglaryCrime.reduce(function(total, count) {//senate
      var number = parseInt(count);
      return total + number;
    }, 0);

    var houseBurglaryChart = houseBurglaryCrime.reduce(function(total, count) {//house
      var number = parseInt(count);
      return total + number;
    }, 0);

    var motorCrime = //senate
      senateCrime
        .filter(function(crime) {
          if (crime.district && crime.count) return true;
        })
        .filter(function(crime) {
          return crime.type === 'MOTOR VEHICLE THEFT' && crime.district === district;
        })
        .map(function(crime) {
          return crime.count;
        });

    var houseMotorCrime = //house
      houseCrime
        .filter(function(crime) {
          if (crime.district && crime.count) return true;
        })
        .filter(function(crime) {
          return crime.type === 'MOTOR VEHICLE THEFT' && crime.district === district;
        })
        .map(function(crime) {
          return crime.count;
        });

    var motorChart = motorCrime.reduce(function(total, count) {//senate
      var number = parseInt(count);
      return total + number;
    }, 0);

    var houseMotorChart = houseMotorCrime.reduce(function(total, count) {//house
      var number = parseInt(count);
      return total + number;
    }, 0);

    var vandalCrime = //senate
      senateCrime
        .filter(function(crime) {
          if (crime.district && crime.count) return true;
        })
        .filter(function(crime) {
          return crime.type === 'VANDALISM' && crime.district === district;
        })
        .map(function(crime) {
          return crime.count;
        });

    var houseVandalCrime = //house
      houseCrime
        .filter(function(crime) {
          if (crime.district && crime.count) return true;
        })
        .filter(function(crime) {
          return crime.type === 'VANDALISM' && crime.district === district;
        })
        .map(function(crime) {
          return crime.count;
        });

    var vandalChart = vandalCrime.reduce(function(total, count) {//senate
        var number = parseInt(count);
        return total + number;
    }, 0);

    var houseVandalChart = houseVandalCrime.reduce(function(total, count) {//senate
        var number = parseInt(count);
        return total + number;
    }, 0);

    var vehicleCrime =
      senateCrime
        .filter(function(crime) {
          if (crime.district && crime.count) return true;
        })
        .filter(function(crime) {
          // return crime.type === 'VEHICLE-BREAK-IN';
          return crime.type === 'VEHICLE BREAK-IN/THEFT' && crime.district === district;
        })
        .map(function(crime) {
          return crime.count;
        });

    var houseVehicleCrime =
      houseCrime
        .filter(function(crime) {
          if (crime.district && crime.count) return true;
        })
        .filter(function(crime) {
          // return crime.type === 'VEHICLE-BREAK-IN';
          return crime.type === 'VEHICLE BREAK-IN/THEFT' && crime.district === district;
        })
        .map(function(crime) {
          return crime.count;
        });

    var vehicleChart = vehicleCrime.reduce(function(total, count) {
        var number = parseInt(count);
        return total + number;
    }, 0);

    var houseVehicleChart = houseVehicleCrime.reduce(function(total, count) {
        var number = parseInt(count);
        return total + number;
    }, 0);

    console.log(this.props.chamber);

    var data;

    if (this.props.chamber === 'senate') {
      data = [
        { name: 'THEFT/LARCENY', count: theftChart},
        { name: 'BURGLARY', count: burglaryChart },
        { name: 'MOTOR VEHICLE THEFT', count: motorChart },
        { name: 'VANDALISM', count: vandalChart },
        { name: 'VEHICLE BREAK-IN', count: vehicleChart }
      ];
      this.setState({ 'data':data });
    }
    if (this.props.chamber === 'house') {
      data = [
        { name: 'THEFT/LARCENY', count: houseTheftChart},
        { name: 'BURGLARY', count: houseBurglaryChart },
        { name: 'MOTOR VEHICLE THEFT', count: houseMotorChart },
        { name: 'VANDALISM', count: houseVandalChart },
        { name: 'VEHICLE BREAK-IN', count: houseVehicleChart }
      ];
      this.setState({ 'data':data });
    }
  },

  render:function(){
    return (
      <div id="pie-chart">
        <h3 id="total-crimes-header">Total Crimes</h3>
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