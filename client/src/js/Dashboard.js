var React = require('react');

var Dashboard = React.createClass({
  //this is the Dashboard module to be exported. Put all code in here.

  render: function() {
    // return our JSX that is rendered to the DOM
    return (
      <div id="dashboard">

      
      </div>
    );
  }

});

// export our Dashboard component so that Browserify can include it with other components that require it
module.exports = Dashboard;