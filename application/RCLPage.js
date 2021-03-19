import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './RCLPage.scss';

export default class RCLPage extends Component {
	componentDidMount() {
		if (this.props.title !== null) {
			document.title = this.props.title;
		} else {
			document.title = 'RCL Page';
		}
	}

	render() {
		return <div className='rcl-page'>{this.props.children}</div>;
	}
}

RCLPage.propTypes = {
	title: PropTypes.string,
};

RCLPage.defaultProps = {
	title: 'LJB Page',
};
