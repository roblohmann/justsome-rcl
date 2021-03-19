import React, { Component } from 'react';
import './../style/_theme.scss';
import './../style/_theme_override.scss';

export default class RCLApp extends Component {
	render() {
		return <div className='main-page'>{this.props.children}</div>;
	}
}
