import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './RCLEditbox.scss';

export default class RCLEditbox extends Component {
	state = { value: this.props.value, focus: false };

	componentDidUpdate(oldProps) {
		if (oldProps.value !== this.props.value) this.setState({ value: this.props.value });
	}

	render() {
		var css = 'rcl-editbox';
		if (this.state.focus) {
			css = css + ' rcl-editbox-focus';
		}

		return (
			<div
				className={css}
				style={{
					width: this.props.width === 'auto' ? '*' : this.props.width,
					flexGrow: this.props.width === 'auto' ? '1' : '0',
				}}
			>
				<input
					id={this.props.id}
					type={this.props.type}
					value={this.props.value !== null ? this.props.value : ''}
					name='name'
					onChange={this.handleChanged}
					placeholder={this.props.placeholder}
					autoComplete={'off'}
					onKeyUp={this.handleKeyPress}
					maxLength={this.props.maxLength}
					onFocus={this.onGotFocus}
					onBlur={this.onLostFocus}
				/>
			</div>
		);
	}

	handleChanged = (event) => {
		this.setState({ value: event.target.value });
		this.props.onChange(event.target.value, this.props.id);
	};

	handleKeyPress = (event) => {
		if (event.keyCode === 13) {
			if (typeof this.props.onEnterKeyPressed === 'function') this.props.onEnterKeyPressed();
		}
	};

	onGotFocus = () => {
		this.setState({ focus: true });
	};

	onLostFocus = () => {
		this.setState({ focus: false });
	};
}

RCLEditbox.propTypes = {
	id: PropTypes.string,
	value: PropTypes.string,
	type: PropTypes.oneOf(['text', 'number', 'password', 'email']),
	placeholder: PropTypes.string,
	width: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]),
	maxLength: PropTypes.number,
	required: PropTypes.bool,
	onChange: PropTypes.func,
	onEnterKeyPressed: PropTypes.func,
};

RCLEditbox.defaultProps = {
	value: null,
	type: 'text',
	placeholder: '',
	width: 'auto',
	maxLength: 500,
	required: false,
	onChange: () => {},
	onEnterKeyPressed: () => {},
};
