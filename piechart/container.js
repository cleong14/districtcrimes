import React, { Component } from 'react'
import {Nav, NavItem} from 'react-bootstrap'

export default class ContainerExample extends Component {

	constructor(props) {
		super(props)
	}

	componentDidMount() {
  }

  _handleClick(event) {
    event.preventDefault()
    var el = event.target
    console.log(el)
  }

	render() {

		const route = this.props.routes[1].path || 'pie'

		return (

			<div>
				<div>
					<a href='#' onClick={this._handleClick.bind(this)}>click the graph</a>
				</div>
				{this.props.children}
			</div>
		)
	}
}