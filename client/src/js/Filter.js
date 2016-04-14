var React = require('react');
// var Checkbox = require('rc-checkbox');

// export our Filter component so that Browserify can include it with other components that require it

var CheckBox = React.createClass({

  getInitialState() {
    return {
      disabled: false,
      // isChecked: true
    };
  },
  toggleChange() {
    this.setState({
      isChecked: !this.state.isChecked
    }, function () {
      // console.log(this.state);
    }.bind(this));
  },
  handleChange(event) {
    // console.log(this.props.type);
    this.props.onChange(this.props.type);//passing in type from the parent
  },
  render() {
    return (
      <div>
        <label>
          <input
            type="checkbox"
            onChange={this.handleChange}
            disabled={this.state.disabled}
            defaultChecked={true}
          />
          &nbsp; {this.props.type}
        </label>
      </div>
    );
  },
});




// //TABS
// var Tabs = React.createClass({
//   getInitialState: function () {
//     return { data: [] };//setting the state to an array
//   },
//   displayName: 'Tabs',
//   propTypes: {
//     selected: React.PropTypes.number,
//     children: React.PropTypes.oneOfType([
//       React.PropTypes.array,
//       React.PropTypes.element
//     ]).isRequired
//   },
//   getDefaultProps: function () {
//     return {
//       selected: 0
//     };
//   },
//   getInitialState: function () {
//     return {
//       selected: this.props.selected
//     };
//   },
//   shouldComponentUpdate(nextProps, nextState) {
//     return this.props !== nextProps || this.state !== nextState;
//   },
//   handleClick: function (index, event) {
//     event.preventDefault();
//     this.setState({
//       selected: index
//     });
//   },
//   _renderTitles: function () {
//     function labels(child, index) {
//       var activeClass = (this.state.selected === index ? 'active' : '');
//       return (
//         <li key={index}>
//           <a href="#"
//             className={activeClass}
//             onClick={this.handleClick.bind(this, index)}>
//             {child.props.label}
//           </a>
//         </li>
//       );
//     }
//     return (
//       <ul className="tabs__labels">
//         {this.props.children.map(labels.bind(this))}
//       </ul>
//     );
//   },
//   _renderContent: function () {
//     return (
//       <div className="tabs__content">
//         {this.props.children[this.state.selected]}
//       </div>
//     );
//   },
//   loadCrimesFromServer: function () {//added
//     var _this = this;
//     $.ajax({
//       url: this.props.url,
//       method: "GET",
//       dataType: "json",
//       success: function (data) {
//         console.log("testing");
//         _this.setState({data: data});
//       }
//     });
//   },
//   componentDidMount: function () {//added
//     // this.loadCrimesFromServer();
//     setInterval(this.loadCrimesFromServer, 5000);
//   },
//   render: function () {
//     return (
//       <div className="tabs">
//         {this._renderTitles()}
//         {this._renderContent()}
//       </div>
//     );
//   }
// });
// var Pane = React.createClass({
//   displayName: 'Pane',
//   propTypes: {
//     label: React.PropTypes.string.isRequired,
//     children: React.PropTypes.element.isRequired
//   },
//   render: function () {
//     return (
//       <div>
//         {this.props.children}
//       </div>
//     );
//   }
// });

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
        <CheckBox
          type={type}
          key={index}
          onChange={this.props.onChange}
        />
      )
    })
    return (
      <div id="filter">
        SELECT YO CRIME, CRACKA HAOLE
          {typeNodes}
          <div>
            <button className="button success" onClick={this.update} value="house">House</button>
            <button className="button warning" onClick={this.update} value="senate">Senate</button>
          </div>
      </div>
    );
  }
});

module.exports = Filter;

// <CrimeList data={this.props.crimes} filter={this.props.filter}/>

