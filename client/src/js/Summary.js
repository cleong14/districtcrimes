var React = require('react');

var Summary = React.createClass({
  //this is the Summary module to be exported. Put all code in here.

  getInitialState: function() {
    // TODO: if we wanted an initial "state" for our map component we could add it here
    return {

    };
  },

  componentWillMount: function() {

    // code to run just before adding the map

  },

  componentDidMount: function() {
  },

  componentWillReceiveProps: function() {
    // this.getPolitician();
  },

  componentWillUnmount: function() {
    // code to run just before removing the map
    // http://d.hipaonline.com/headshots/Baker.jpg
  },

  // getPolitician: function () {
  //   if (this.props.districtData) {
  //     console.log('running ajax...');
  //     $.ajax({
  //       url: 'http://d.hipaonline.com/headshots/Baker.jpg',
  //       // url: this.props.districtData.senate[0].politician_picture,
  //       method: "GET",
  //       dataType: "json",
  //       success: (data) => {
  //         console.log(data);
  //         $('#photo').append(data);
  //       },
  //       failure: function (err) {
  //         // console.log(err);
  //       }
  //     });
  //   }
  // },

  render: function() {
    // return our JSX that is rendered to the DOM
    return (
      <div id="summary">
        <h1>I AM THE Summary</h1>
        <div id="photo"></div>
      </div>
    );
  }

});

// export our Summary component so that Browserify can include it with other components that require it
module.exports = Summary;