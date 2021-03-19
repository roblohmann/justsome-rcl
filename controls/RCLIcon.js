import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './RCLIcon.scss';

export default class RCLIcon extends Component {
	render() {
		return (
			<div id={this.props.id} className='rcl-icon'>
				<i className='material-icons' style={{ fontSize: this.props.size, color: this.props.color }}>
					{this.props.icon}
				</i>
			</div>
		);
	}
}

RCLIcon.propTypes = {
	icon: PropTypes.string,
	size: PropTypes.number,
	color: PropTypes.string,
};

RCLIcon.defaultProps = {
	icon: 'thumb_up',
	size: 24,
	color: '#000000',
};
