

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
      console.log(item);
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
      return <div className={"dropdown-container" + (this.state.listVisible ? " show": " ")}>
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





var Tabs = React.createClass({
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

var App = React.createClass({
  render: function () {
    return (
      <div>
        <Tabs selected={0}>
          <Pane label="Poltical">
            <div>This is my tab 1 contents!
              <Dropdown list={colours} selected={colours[2]} />
            </div>
          </Pane>
          <Pane label="Address">
            <div>Find out more about your area!</div>
          </Pane>
          <Pane label="Crimes">
            <div>This is my tab 3 contents!</div>
          </Pane>
        </Tabs>
      </div>
    );
  }
});






 
ReactDOM.render(<App />,  document.querySelector('.container'));






