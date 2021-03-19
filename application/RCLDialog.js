import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RCLButton from './../controls/RCLButton'
import RCLIcon from './../controls/RCLIcon'
import './RCLDialog.scss'

export default class RCLDialog extends Component {
    render() {
        const height = this.props.height === 'auto' ? 'auto' : this.props.height
        let adjustedHeight = height > window.innerHeight ? window.innerHeight - 40 : height
        const overflow = height === adjustedHeight ? 'visible' : 'auto'

        return (
            <div className='dialog-overlay'>
                <div
                    testid={this.props.testId}
                    className={'dialog'}
                    style={{
                        maxWidth: this.props.width === 'auto' ? '100%' : this.props.width,
                        width: this.props.width === 'auto' ? '*' : this.props.width,
                        height: adjustedHeight,
                        maxHeight: adjustedHeight,
                        flexGrow: this.props.width === 'auto' ? '1' : '0'
                    }}
                >
                    <div className='dialog-header'>
                        {this.props.title !== '' ? (
                            <div className='dialog-title'>{this.props.title}</div>
                        ) : null}
                        <div className='dialog-close' onClick={this.props.onCancel}>
                            <RCLIcon icon={'close'} />
                        </div>
                    </div>

                    <div className='dialog-body' style={{ overflow: overflow }}>
                        <div className='dialog-body-contents'>{this.props.children}</div>
                    </div>

                    <div className='dialog-footer'>
                        {this.props.customFooter === null ? (
                            <React.Fragment>
                                {this.props.showCancelButton ? (
                                    <RCLButton
                                        label={this.props.cancelButtonLabel}
                                        backgroundColor={'#ffffff'}
                                        onChange={this.props.onCancel}
                                    />
                                ) : null}
                                <div style={{ marginLeft: 10 }} />
                                {this.props.showOkButton ? (
                                    <RCLButton
                                        label={this.props.okButtonLabel}
                                        disable={this.props.disableOkButton}
                                        onChange={this.props.onOk}
                                    />
                                ) : null}
                            </React.Fragment>
                        ) : (
                            this.props.customFooter
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

RCLDialog.propTypes = {
    title: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]),
    customFooter: PropTypes.object,
    okButtonLabel: PropTypes.string,
    cancelButtonLabel: PropTypes.string,
    showOkButton: PropTypes.bool,
    showCancelButton: PropTypes.bool,
    disableOkButton: PropTypes.bool
}

RCLDialog.defaultProps = {
    title: '',
    width: 'auto',
    height: 'auto',
    customFooter: null,
    okButtonLabel: 'Ok',
    cancelButtonLabel: 'Cancel',
    showOkButton: true,
    showCancelButton: true,
    disableOkButton: false
}
