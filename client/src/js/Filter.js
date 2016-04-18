var React = require('react');

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
          <div className="chamber-buttons">
            <button className="button success" onClick={this.update} value="house">House</button>
            <button className="button warning" onClick={this.update} value="senate">Senate</button>
          </div>
      </div>
    );
  }
});

module.exports = Filter;