import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Theme from '../core/Theme';
import './RCLButton.scss';

export const RCLButtonType = Object.freeze({
    Text: 1,
    Icon: 2,
    IconText: 3,
    TextIcon: 4
});

export default class RCLButton extends Component {
    state = { hover: false, focus: false, isOn: false };

    renderText = () => {
        let script = [];

        const style = {
            width: this.props.width === 'auto' ? 'auto' : this.props.width,
            height: '36px',
            backgroundColor: this.getBackgroundColor(),
            borderColor: this.getBorderColor(),
            color: this.getTextColor()
        };

        script.push(
            <div key='text' className={'rcl-button-text'} style={style}>
                {this.props.label}
            </div>
        );

        return script;
    };

    renderIcon = () => {
        let script = [];
        const radius = this.props.width === 'auto' ? 'auto' : this.props.width;
        const fontSize = Math.floor(radius * 0.6);
        const iconColor = this.getIconColor();
        const style = {
            width: radius,
            height: radius,
            flexGrow: this.props.width === 'auto' ? '1' : '0',
            backgroundColor: this.getBackgroundColor(),
            borderColor: this.getBorderColor(),
            color: this.getTextColor()
        };

        script.push(
            <div key='icon' className={'rcl-button-icon'} style={style}>
                <i className='material-icons' style={{ fontSize: fontSize, color: iconColor }}>
                    {this.props.icon}
                </i>
            </div>
        );

        return script;
    };

    renderIconText = () => {
        let script = [];
        const iconColor = this.getIconColor();
        const style = {
            width: this.props.width === 'auto' ? 'auto' : this.props.width,
            height: '36px',
            flexGrow: this.props.width === 'auto' ? '1' : '0',
            backgroundColor: this.getBackgroundColor(),
            borderColor: this.getBorderColor(),
            color: this.getTextColor()
        };

        script.push(
            <div key='text' className={'rcl-button-icon-text'} style={style}>
                <i className='material-icons' style={{ color: iconColor }}>
                    {this.props.icon}
                </i>
                <span>{this.props.label}</span>
            </div>
        );

        return script;
    };

    renderTextIcon = () => {
        let script = [];

        const style = {
            width: this.props.width === 'auto' ? 'auto' : this.props.width,
            height: '36px',
            flexGrow: this.props.width === 'auto' ? '1' : '0',
            backgroundColor: this.getBackgroundColor(),
            borderColor: this.getBorderColor(),
            color: this.getTextColor()
        };

        script.push(
            <div key='text' className={'rcl-button-text-icon'} style={style}>
                <span>{this.props.label}</span>
                <i className='material-icons'>{this.props.icon}</i>
            </div>
        );

        return script;
    };

    getBorderColor = () => {
        if (this.props.backgroundColor === 'transparent' && this.props.showBorder)
            return Theme.GetColor(Theme.Color.Border);

        const borderColor = this.props.showBorder
            ? Theme.LightenDarkenColor(this.props.backgroundColor, -20)
            : this.props.backgroundColor;

        return borderColor;
    };

    getTextColor = () => {
        let textColor = this.props.textColor;

        if (this.state.hover && !this.props.disable) {
            textColor = Theme.LightenDarkenColor(this.props.textColor, -20);
        } else if (this.props.disable) {
            textColor = '#c0c0c0';
        }

        return textColor;
    };

    getIconColor = () => {
        let iconColor = this.props.disable ? '#c0c0c0' : this.props.iconColor;

        return iconColor;
    };

    getBackgroundColor = () => {
        let backgroundColor = this.props.backgroundColor;

        if (this.props.disable) {
            backgroundColor = this.props.backgroundColor;
        } else if (this.state.hover) {
            if (backgroundColor === 'transparent') {
                return '#f0f0f0';
            }

            backgroundColor = Theme.LightenDarkenColor(this.props.backgroundColor, 20);
        }

        return backgroundColor;
    };

    render() {
        let script;

        switch (this.props.type) {
            case RCLButtonType.Icon:
                script = this.renderIcon();
                break;

            case RCLButtonType.IconText:
                script = this.renderIconText();
                break;

            case RCLButtonType.TextIcon:
                script = this.renderTextIcon();
                break;

            default:
                script = this.renderText();
                break;
        }

        return (
            <div
                id={this.props.id}
                className={'rcl-button'}
                style={{ cursor: this.props.disable ? 'default' : 'pointer' }}
                onMouseEnter={this.onHoverIn}
                onMouseLeave={this.onHoverOut}
                onFocus={this.onGotFocus}
                onBlur={this.onLostFocus}
                onClick={this.onClick}
            >
                {script}
            </div>
        );
    }

    onClick = () => {
        if (this.props.disable) {
            return;
        }

        this.props.onChange('click', this.props.id);
    };

    onGotFocus = () => {
        this.setState({ focus: true });
    };

    onLostFocus = () => {
        this.setState({ focus: false });
    };

    onHoverIn = () => {
        this.setState({ hover: true });
    };

    onHoverOut = () => {
        this.setState({ hover: false });
    };
}

RCLButton.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    icon: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]),
    type: PropTypes.number,
    textColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    iconColor: PropTypes.string,
    showBorder: PropTypes.bool,
    disable: PropTypes.bool,
    onChange: PropTypes.func.isRequired
};

RCLButton.defaultProps = {
    id: 'button',
    label: 'Button',
    icon: 'thumb_up',
    width: 100,
    type: 1,
    textColor: '#000000',
    backgroundColor: Theme.GetColor(Theme.Color.SecondaryLight),
    iconColor: '#000000',
    showBorder: true,
    disable: false,
    onChange: () => {}
};
