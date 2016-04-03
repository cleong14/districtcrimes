var React = require('react');

var Summary = React.createClass({
  //this is the Summary module to be exported. Put all code in here.

  render: function() {
    // return our JSX that is rendered to the DOM
    return (
      <div id="summary">
      </div>
    );
  }

});

// export our Summary component so that Browserify can include it with other components that require it
module.exports = Summary;