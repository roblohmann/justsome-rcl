import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './RCLRadioButton.scss';

export default class RCLRadioButton extends Component {
	render() {
		const style = this.props.horizontal ? { flexDirection: 'row' } : { flexDirection: 'column' };
		const styleButton = this.props.horizontal ? { marginBottom: 0 } : { marginBottom: 10 };

		return (
			<div className='rcl-radio' style={style}>
				{this.props.buttons.map((row, index) => {
					const css = this.props.disable ? 'rcl-radio-button-disabled' : 'rcl-radio-button';
					const cssButton = this.props.disable
						? 'rcl-radio-button-selected-disabled'
						: 'rcl-radio-button-selected';
					const isSelected = row.id === this.props.selected;

					return (
						<div key={index} className='rcl-radio-item' style={styleButton}>
							<div id={row.id} className={css} onClick={this.onButtonClicked}>
								{isSelected && <div id={row.id} className={cssButton} />}
							</div>
							<div className='rcl-radio-item-label'>{row.label}</div>
						</div>
					);
				})}
			</div>
		);
	}

	onButtonClicked = (e) => {
		if (this.props.disabled) return;

		const { id } = e.target;

		this.props.onChange(parseInt(id), this.props.id);
	};
}

RCLRadioButton.propTypes = {
	id: PropTypes.string,
	buttons: PropTypes.array,
	selected: PropTypes.number,
	horizontal: PropTypes.bool,
	disable: PropTypes.bool,
	onChange: PropTypes.func,
};

RCLRadioButton.defaultProps = {
	id: 'radio_button',
	buttons: [],
	selected: -1,
	horizontal: false,
	disable: false,
	onChange: () => {},
};
