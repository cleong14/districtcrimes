var React = require('react');
var Checkbox = require('rc-checkbox');




// export our Filter component so that Browserify can include it with other components that require it




const CheckBox = React.createClass({
  getInitialState() {
    return {
      disabled: false,
    };
  },
  toggle() {
    this.setState({
      disabled: !this.state.disabled,
    });
  },
  handleChange(event) {
    this.props.onChange(this.props.type);//passing in type from the parent
  },
  render() {
    return (<div style={{ margin: 20 }}>
      <div>
        <p>
          <label>
            <Checkbox
              onChange={this.handleChange}
              disabled={this.state.disabled}
            />
            &nbsp; {this.props.type}
          </label>
          &nbsp;&nbsp;
        </p>
      </div>
    </div>);
  },
});






var SearchBar = React.createClass({
  handleChange: function() {
      this.props.onUserInput(
          this.refs.filterTextInput.getDOMNode().value
      );
  },
  render: function() {
      return (
          <form>
              <input
                  type="text"
                  placeholder="Search..."
                  value={this.props.filterText}
                  ref="filterTextInput"
                  onChange={this.handleChange}
              />
          </form>
      );
  }
});


var crime_type_totals = {
  theft_larceny: 0,
  vehicle_breakIn_theft: 0,
  vandalism: 0,
  burglary: 0,
  motor_vehicle_theft: 0
}
var currentlyDisplayed = {
  total: 0
}
var CrimeList = React.createClass({//factor in type states
  render: function () {
  crime_type_totals = {
    theft_larceny: 0,
    vehicle_breakIn_theft: 0,
    vandalism: 0,
    burglary: 0,
    motor_vehicle_theft: 0
  }
  currentlyDisplayed = {
    total: 0
  }
  var crimeNodes = this.props.data.map((crime, index) => {//map is making a new array
    if (this.props.filter.indexOf(crime.type) > -1) {//this makes things faster by running this first, only accounting for whats checked instead of loading all
      currentlyDisplayed.total++;
    } else {
      return;
    }
    if (crime.type === 'THEFT/LARCENY') {
    crime_type_totals.theft_larceny++; 
    }
    if (crime.type === 'VEHICLE BREAK-IN/THEFT') {
    crime_type_totals.vehicle_breakIn_theft++; 
    }
    if (crime.type === 'BURGLARY') {
    crime_type_totals.burglary++; 
    }
    if (crime.type === 'MOTOR VEHICLE THEFT') {
    crime_type_totals.motor_vehicle_theft++; 
    }
    if (crime.type === 'VANDALISM') {
    crime_type_totals.vandalism++; 
    }
      return (
        <Crime
          key={index}
          
        >
          
        </Crime>
      )
  })
  console.log(crime_type_totals);
  console.log(currentlyDisplayed);
  
    return (
      <div className="crimeList">
        {crimeNodes.reverse()}
      </div>
    )
  }
});



var Crime = React.createClass({//type is "type"
  render: function () {
    return (
      <div className="crime">
        <h4 className="crimeType">
          {this.props.crimeType}
        </h4>
        <p>{this.props.children}</p>
      </div>
    )
  }
})


var colours = [{
    name: "Red",
    hex: "#F21B1B"
}, {
    name: "Blue",
    hex: "#1B66F2"
}, {
    name: "Green",
    hex: "#07BA16"
}];


//dropdown list
var Dropdown = React.createClass({
    getInitialState: function () {
      return {
        selected: this.props.selected,//default state
        listVisible: false
      };
    },
    select: function (item) {//when clicked
      this.setState({
        selected: item,
        listVisible: true
      });
    },
    show: function () {
      this.setState({ listVisible: true });
      document.addEventListener("click", this.show);
    },
    hide: function () {
      this.setState({ listVisible: false });
      document.addEventListener("click", this.hide);
    },
    render: function () {
    return  <div className={"dropdown-container" + (this.state.listVisible ? " show": " ")}>
                <div className={"dropdown-display" + (this.state.listVisible ? " clicked": "")} onClick={this.show}>
                  <span style={{ color: this.state.selected.hex }}>{this.state.selected.name}</span>
                  <i className="fa fa-angle-down"></i>
                </div>
                <div className="dropdown-list">
                  <div>
                    {this.renderListItems()}
                  </div>
                </div>
            </div>
    },
    renderListItems: function () {
      var items = [];
      for (var i = 0; i < this.props.list.length; i++) {
        var item = this.props.list[i];
        items.push(<div key={i} onClick={this.select.bind(null, item)}>
          <span style={{ color: item.hex }}>{item.name}</span>
        </div>);
      }
      return items;
    }
});




var HelloWorld = React.createClass({
  render: function() {
    return (
      <div>
        <h4>Crimes</h4>

        <p>
          Hello, <input type="text" placeholder="Your name here" />!
          It is {this.props.date.toTimeString()} In your District.
        </p>
      </div>
    );
  }
});


//TABS
var Tabs = React.createClass({
  getInitialState: function () {
    return { data: [] };//setting the state to an array
  },
  displayName: 'Tabs',
  propTypes: {
    selected: React.PropTypes.number,
    children: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.element
    ]).isRequired
  },
  getDefaultProps: function () {
    return {
      selected: 0
    };
  },
  getInitialState: function () {
    return {
      selected: this.props.selected
    };
  },
  shouldComponentUpdate(nextProps, nextState) {
    return this.props !== nextProps || this.state !== nextState;
  },
  handleClick: function (index, event) {
    event.preventDefault();
    this.setState({
      selected: index
    });
  },
  _renderTitles: function () {
    function labels(child, index) {
      var activeClass = (this.state.selected === index ? 'active' : '');
      return (
        <li key={index}>
          <a href="#"
            className={activeClass}
            onClick={this.handleClick.bind(this, index)}>
            {child.props.label}
          </a>
        </li>
      );
    }
    return (
      <ul className="tabs__labels">
        {this.props.children.map(labels.bind(this))}
      </ul>
    );
  },
  _renderContent: function () {
    return (
      <div className="tabs__content">
        {this.props.children[this.state.selected]}
      </div>
    );
  },
  loadCrimesFromServer: function () {//added
    var _this = this;
    $.ajax({
      url: this.props.url,
      method: "GET",
      dataType: "json",
      success: function (data) {
        console.log("testing");
        _this.setState({data: data});
      }
    });
  },
  componentDidMount: function () {//added
    // this.loadCrimesFromServer();
    setInterval(this.loadCrimesFromServer, 5000);
  },
  render: function () {
    return (
      <div className="tabs">
        {this._renderTitles()}
        {this._renderContent()}
      </div>
    );
  }
});

var Pane = React.createClass({
  displayName: 'Pane',
  propTypes: {
    label: React.PropTypes.string.isRequired,
    children: React.PropTypes.element.isRequired
  },
  render: function () {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
});


//parents have state, children have props
//props never change and always need to be passed from parent to child
var Filter = React.createClass({
  update: function(event) {
    var value = event.target.getAttribute('value');
    this.props.updateChamber(value);
  },

  render: function () {
    var typeNodes = this.props.types.map((type, index) => {//by doing es6 it automatically binds this
      return (
        <CheckBox type={type} key={index} onChange={this.props.onChange} />
      )
    })
    return (
      <div id="filter">
        <Tabs selected={0}>
          <Pane label="Poltical">
            <div>Info Tab
              {typeNodes}
              <div>
                <button onClick={this.update} value="house">House</button>
                <button onClick={this.update} value="senate">Senate</button>
              </div>
              <CrimeList data={this.props.crimes} />

            </div>
          </Pane>
          <Pane label="Address">
            <SearchBar />
          </Pane>
          <Pane label="Crimes">
            <div>This is my tab 3 contents!</div>

          </Pane>
        </Tabs>
      </div>
    );
  }
});


module.exports = Filter;