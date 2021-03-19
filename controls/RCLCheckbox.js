import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './RCLCheckbox.scss';

export default class RCLCheckbox extends Component {
	state = { checked: this.props.value };

	componentDidUpdate(oldProps) {
		if (oldProps.value !== this.props.value) this.setState({ checked: this.props.value });
	}

	render() {
		var script = [];
		var css = this.props.disabled ? 'rcl-checkbox-disabled' : 'rcl-checkbox';

		if (this.state.checked) {
			script.push(
				<div key={1} className={css} onClick={this.onClick}>
					<i className='material-icons'>check</i>
				</div>
			);
		} else {
			script.push(<div key={1} className={css} onClick={this.onClick}></div>);
		}

		return <React.Fragment>{script}</React.Fragment>;
	}

	onClick = () => {
		if (this.props.disabled === true) return;

		const value = !this.state.checked;

		this.props.onChange(value, this.props.id);

		this.setState({ checked: value });
	};
}

RCLCheckbox.propTypes = {
	id: PropTypes.any,
	value: PropTypes.bool,
	disabled: PropTypes.bool,
	onChange: PropTypes.func,
};

RCLCheckbox.defaultProps = {
	id: 1,
	value: false,
	disabled: false,
	onChange: () => {},
};
