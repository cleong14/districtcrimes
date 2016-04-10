import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory, IndexRedirect} from 'react-router'
import Container from './container'

import Pie from './src/tooltip_pie'

// Declarative route configuration (could also load this config lazily
// instead, all you really need is a single root route, you don't need to
// colocate the entire config).
        
ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/piechart" component={Container}>
      <IndexRedirect to="pie"/>
      <Route path="pie" component={Pie}/>   
    </Route>
  </Router>
), document.getElementById('root'))
