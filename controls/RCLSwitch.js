import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './RCLSwitch.scss';

export default class RCLSwitch extends Component {
	state = { isOn: this.props.value };

	componentDidUpdate(oldProps) {
		if (oldProps.value !== this.props.value) this.setState({ isOn: this.props.value });
	}

	render() {
		var script = [];
		var css = this.props.disabled ? 'rcl-switch-disabled' : 'rcl-switch';
		var cssOnLeft = this.props.disabled ? 'rcl-switch-on-left-disabled' : 'rcl-switch-on-left';
		var cssOnRight = this.props.disabled ? 'rcl-switch-on-right-disabled' : 'rcl-switch-on-right';

		if (this.state.isOn) {
			script.push(
				<div key={1} className={css} onClick={this.onThumbClicked}>
					<div className='rcl-switch-off'>{this.props.noLabel}</div>
					<div className={cssOnLeft}>{this.props.yesLabel}</div>
				</div>
			);
		} else {
			script.push(
				<div key={1} className={css} onClick={this.onThumbClicked}>
					<div className={cssOnRight}>{this.props.noLabel}</div>
					<div className='rcl-switch-off'>{this.props.yesLabel}</div>
				</div>
			);
		}

		return <React.Fragment>{script}</React.Fragment>;
	}

	onThumbClicked = () => {
		if (this.props.disabled === true) return;

		const value = !this.state.isOn;

		this.props.onChange(value, this.props.id);

		this.setState({ isOn: value });
	};
}

RCLSwitch.propTypes = {
	id: PropTypes.any,
	value: PropTypes.bool,
	yesLabel: PropTypes.string,
	noLabel: PropTypes.string,
	disabled: PropTypes.bool,
	onChange: PropTypes.func,
};

RCLSwitch.defaultProps = {
	id: 1,
	value: false,
	yesLabel: 'Yes',
	noLabel: 'No',
	disabled: false,
	onChange: () => {},
};
