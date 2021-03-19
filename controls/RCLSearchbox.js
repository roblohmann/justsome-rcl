import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './RCLSearchbox.scss';

export default class RCLSearchbox extends Component {
	state = {
		focus: false,
	};

	render() {
		var css = 'rcl-searchbox';
		if (this.state.focus) {
			css = css + ' rcl-searchbox-focus';
		}

		return (
			<div
				className={css}
				style={{
					width: this.props.width === 'auto' ? '*' : this.props.width,
					flexGrow: this.props.width === 'auto' ? '1' : '0',
				}}
			>
				<div className='rcl-searchbox-body'>
					<input
						id={this.props.id}
						type={'text'}
						value={this.props.value !== null ? this.props.value : ''}
						name='name'
						onChange={this.handleChanged}
						placeholder={this.props.placeholder}
						autoComplete={'off'}
						onKeyUp={this.handleKeyPress}
						onFocus={this.onGotFocus}
						onBlur={this.onLostFocus}
					/>
				</div>

				{this.props.value !== '' && (
					<div className='rcl-searchbox-clear-button' onClick={this.onClear}>
						<i className='material-icons'>cancel</i>
					</div>
				)}

				<div className='rcl-searchbox-search-button' onClick={this.onSearch}>
					<i className='material-icons'>search</i>
				</div>
			</div>
		);
	}

	handleChanged = (event) => {
		const query = event.target.value;

		this.props.onChange(query);
	};

	handleKeyPress = (event) => {
		if (event.keyCode === 13) {
			this.onSearch(this.props.value);
		}
	};

	onSearch = () => {
		this.props.onSearch(this.props.value);
	};

	onClear = () => {
		this.props.onClear('');
	};

	onGotFocus = () => {
		this.setState({ focus: true });
	};

	onLostFocus = () => {
		this.setState({ focus: false });
	};
}

RCLSearchbox.propTypes = {
	id: PropTypes.any,
	value: PropTypes.string,
	placeholder: PropTypes.string,
	width: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]),
	onChange: PropTypes.func,
	onSearch: PropTypes.func,
	onClear: PropTypes.func,
};

RCLSearchbox.defaultProps = {
	width: 'auto',
	value: '',
	onChange: () => {},
	onSearch: () => {},
	onClear: () => {},
};
