import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './RCLDropdown.scss';

export default class RCLDropdown extends Component {
	constructor(props) {
		super(props);

		this.dropdown = React.createRef();
	}

	state = {
		listIsVisible: false,
		selectedId: -1,
		selectedText: '',
		placeholderText: this.props.placeholder,
		focus: false,
	};

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClick, false);
	}

	componentDidMount() {
		document.addEventListener('mousedown', this.handleClick, false);
		this.selectItem(this.props.selectedValueKey);
	}

	componentDidUpdate(oldProps) {
		if (oldProps.selectedValueKey !== this.props.selectedValueKey) {
			this.selectItem(this.props.selectedValueKey);
		}
	}

	selectItem = (selectedValueKey) => {
		let text;
		let selectedIndex = 0;

		if (
			selectedValueKey === -1 ||
			selectedValueKey === null ||
			selectedValueKey === '-1' ||
			selectedValueKey === undefined
		) {
			text = this.state.placeholderText;
		} else {
			this.props.data.forEach((item) => {
				if (item[this.props.valueKey] === selectedValueKey) {
					selectedIndex = this.props.data.indexOf(item);
				}
			});

			text = this.props.data[selectedIndex][this.props.displayKey];
		}

		this.setState({
			selectedId: this.props.selectedValueKey,
			selectedText: text,
		});
	};

	getCss = () => {
		var css = 'rcl-dropdown';

		if (!this.props.showBorder) {
			css = css + ' rcl-dropdown-noborder';
		}

		if (this.state.focus && !this.props.required) {
			css = css + ' rcl-dropdown-focus';
		}

		return css;
	};

	render() {
		var width = this.props.width === 'auto' ? 'auto' : this.props.width;
		const css = this.getCss();

		var style = { width: width };
		if (this.props.width === 'auto') {
			style.width = 'auto';
			style.flexGrow = 1;
		}

		return (
			<div
				id={this.props.id}
				ref={(node) => (this.dropdown = node)}
				className={css}
				style={style}
				tabIndex={this.props.tabIndex}
				onFocus={this.onGotFocus}
				onBlur={this.onLostFocus}
			>
				<div key={1} className='rcl-dropdown-box' onClick={this.onDropdown}>
					<div className='rcl-dropdown-field'>
						<div
							className={
								this.state.selectedText === this.state.placeholderText
									? 'rcl-dropdown-field-placeholder'
									: 'rcl-dropdown-field-contents'
							}
						>
							<span className='rcl-dropdown-field-text'>{this.state.selectedText}</span>
						</div>
					</div>

					<div className='rcl-dropdown-button' onClick={this.onDropdown}>
						{this.state.listIsVisible ? (
							<i className='material-icons'>keyboard_arrow_up</i>
						) : (
							<i className='material-icons'>keyboard_arrow_down</i>
						)}
					</div>
				</div>

				{this.state.listIsVisible ? (
					<div className='rcl-dropdown-container'>
						<div className='rcl-dropdown-list'>
							{this.props.data.map((row) => {
								return (
									<div
										name={row[this.props.displayKey]}
										key={row[this.props.valueKey]}
										className='rcl-dropdown-list-item'
										id={this.props.id}
										onClick={(e) => this.onListClosed(row, e)}
									>
										<span>{row[this.props.displayKey]}</span>
									</div>
								);
							})}
						</div>
					</div>
				) : null}
			</div>
		);
	}

	handleClick = (e) => {
		if (this.dropdown.contains(e.target) === false) {
			this.setState({ listIsVisible: false });
		}
	};

	onDropdown = () => {
		var isVisible = this.state.listIsVisible;
		this.setState({ listIsVisible: !isVisible });
	};

	onListClosed = (data, e) => {
		if (data === -1) {
			this.setState({
				listIsVisible: false,
				selectedId: -1,
				selectedText: this.state.placeholderText,
			});

			if (!this.props.required) this.props.onChange(null, this.props.id);
		} else {
			this.setState({
				listIsVisible: false,
				selectedId: data[this.props.valueKey],
				selectedText: data[this.props.displayKey],
			});

			this.props.onChange(data[this.props.valueKey], this.props.id);
		}
	};

	onGotFocus = () => {
		this.setState({ focus: true });
	};

	onLostFocus = () => {
		this.setState({ focus: false });
	};
}

RCLDropdown.propTypes = {
	id: PropTypes.string,
	style: PropTypes.number,
	data: PropTypes.array,
	selectedValueKey: PropTypes.any,
	width: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]),
	placeholder: PropTypes.string,
	tabIndex: PropTypes.number,
	showBorder: PropTypes.bool,
	required: PropTypes.bool,
	onChange: PropTypes.func,
};

RCLDropdown.defaultProps = {
	data: [],
	style: 500,
	selectedValueKey: -1,
	width: 'auto',
	placeholder: 'Select',
	showBorder: true,
	required: false,
	onChange: () => {},
};
