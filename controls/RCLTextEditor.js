import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RCLIcon from './RCLIcon';
import './RCLTextEditor.scss';

export default class RCLTextEditor extends Component {
	state = { buffer: '', savedRange: null };

	componentDidMount() {
		const { value, id } = this.props;
		const textField = document.getElementById(id);

		textField.innerHTML = value;
		document.execCommand('styleWithCSS', false, 'true');
	}

	componentDidUpdate(oldProps) {
		if (oldProps.value !== this.props.value) {
			const { value, id } = this.props;
			const textField = document.getElementById(id);

			textField.innerHTML = value;
			document.execCommand('styleWithCSS', false, 'true');

			if (value.length > 0) {
				setCursorToEnd(textField);
			}

			this.setState({ savedRange: null });
		}
	}

	render() {
		const { height, width, placeholder, id } = this.props;
		const fieldCss = this.props.showToolbar
			? 'rcl-texteditor-field rcl-texteditor-field-toolbar'
			: 'rcl-texteditor-field rcl-texteditor-field-border';

		return (
			<div className='rcl-texteditor' style={{ width, height }}>
				{this.props.showToolbar && (
					<div className='rcl-texteditor-toolbar'>
						<div className='rcl-texteditor-toolbar-button' onClick={this.onBoldClicked}>
							<RCLIcon icon={'format_bold'} color={'#333333'} size={24} />
						</div>
						<div className='rcl-texteditor-toolbar-button' onClick={this.onItalicClicked}>
							<RCLIcon icon={'format_italic'} color={'#333333'} size={24} />
						</div>
						<div className='rcl-texteditor-toolbar-button' onClick={this.onUnderlinedClicked}>
							<RCLIcon icon={'format_underline'} color={'#333333'} size={24} />
						</div>
						<div style={{ marginLeft: 10 }} />
						{this.props.showLinks && (
							<div className='rcl-texteditor-toolbar-button' onClick={this.onLinkClicked}>
								<RCLIcon icon={'link'} color={'#333333'} size={24} />
							</div>
						)}
					</div>
				)}

				<div
					id={id}
					className={fieldCss}
					contentEditable={true}
					data-text={placeholder}
					onClick={this.onTextFieldBlur}
					onInput={this.onTextFieldInput}
					onKeyDown={this.onKeyDown}
				/>
			</div>
		);
	}

	onBoldClicked = () => {
		this.restoreSelection();
		document.execCommand('bold', false, '');
		this.clearSelection();
	};

	onItalicClicked = () => {
		this.restoreSelection();
		document.execCommand('italic', false, '');
		this.clearSelection();
	};

	onUnderlinedClicked = () => {
		this.restoreSelection();
		document.execCommand('underline', false, '');
		this.clearSelection();
	};

	onLinkClicked = () => {
		this.restoreSelection();
		document.execCommand('backColor', false, '#f7ff00');
		this.clearSelection();
	};

	onKeyDown = (e) => {
		const textField = document.getElementById(this.props.id);
		let text = textField.innerHTML.replace(/<\/?[^>]+(>|$)/g, '');

		if (e.keyCode !== 8 && this.props.maxLength > 0 && text.length > this.props.maxLength) {
			e.preventDefault();
		}
	};

	onTextFieldInput = () => {
		const textField = document.getElementById(this.props.id);

		if (textField.innerText.trim().length === 0) {
			this.props.onChange('');
		} else {
			this.props.onChange(textField.innerHTML);
		}
	};

	onTextFieldBlur = () => {
		this.saveSelection();
	};

	saveSelection = () => {
		if (window.getSelection) {
			this.setState({ savedRange: window.getSelection().getRangeAt(0) });
		} else if (document.selection) {
			this.setState({ savedRange: document.selection.createRange() });
		}
	};

	restoreSelection = () => {
		const { savedRange } = this.state;
		const textField = document.getElementById(this.props.id);
		textField.focus();

		if (savedRange != null) {
			if (window.getSelection) {
				const selection = window.getSelection();
				if (selection.rangeCount > 0) selection.removeAllRanges();
				selection.addRange(savedRange);
			} else if (document.createRange) {
				window.getSelection().addRange(savedRange);
			} else if (document.selection) {
				savedRange.select();
			}
		}
	};

	clearSelection = () => {
		if (window.getSelection) {
			window.getSelection().removeAllRanges();
		} else if (document.selection) {
			document.selection.empty();
		}
	};
}

function setCursorToEnd(textEditor) {
	let range = document.createRange();
	let sel = window.getSelection();
	range.setStart(textEditor, 1);
	range.collapse(true);
	sel.removeAllRanges();
	sel.addRange(range);
}

RCLTextEditor.propTypes = {
	id: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	height: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto', '100%'])]),
	width: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto', '100%'])]),
	maxLength: PropTypes.number,
	showLinks: PropTypes.bool,
	showToolbar: PropTypes.bool,
};

RCLTextEditor.defaultProps = {
	placeholder: '',
	height: '100%',
	width: '100%',
	maxLength: 0,
	showLinks: true,
	showToolbar: true,
};
