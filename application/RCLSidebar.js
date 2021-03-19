import React from 'react';
import PropTypes from 'prop-types';
import RCLButton, { RCLButtonType } from './../controls/RCLButton';
import './RCLSidebar.scss';

export default function RCLSidebar(props) {
    if (props.isModal) {
        return (
            <div className='rcl-sidebar'>
                <div className='rcl-sidebar-modal'>
                    <div className='rcl-sidebar-modal-title'>{props.caption}</div>
                    <div className='rcl-sidebar-modal-button'>
                        <RCLButton
                            type={RCLButtonType.Icon}
                            icon={'close'}
                            width={40}
                            showBorder={false}
                            iconColor={'#ffffff'}
                            backgroundColor={'#e74c3c'}
                            onChange={props.onCloseModal}
                        />
                    </div>
                </div>
                <div className='rcl-sidebar-body'>{props.children}</div>
            </div>
        );
    }

    return (
        <div className='rcl-sidebar'>
            <div className='rcl-sidebar-main'>
                {props.showBackButton && (
                    <div className='rcl-sidebar-main-button'>
                        <RCLButton
                            type={RCLButtonType.Icon}
                            icon={'arrow_back'}
                            width={40}
                            showBorder={false}
                            iconColor={'#ffffff'}
                            backgroundColor={'#2874a6'}
                            onChange={props.onGoBack}
                        />
                    </div>
                )}
                <div className='rcl-sidebar-main-title'>{props.caption}</div>
                {props.showHistoryButton && (
                    <div className='rcl-sidebar-main-button'>
                        <RCLButton
                            type={RCLButtonType.Icon}
                            icon={'history'}
                            width={40}
                            showBorder={false}
                            iconColor={'#ffffff'}
                            backgroundColor={'#2874a6'}
                            onChange={props.onHistory}
                        />
                    </div>
                )}
            </div>
            <div className='rcl-sidebar-body'>{props.children}</div>
        </div>
    );
}

RCLSidebar.propTypes = {
    caption: PropTypes.string,
    isModal: PropTypes.bool,
    showBackButton: PropTypes.bool,
    showHistoryButton: PropTypes.bool,
    onGoBack: PropTypes.func
};

RCLSidebar.defaultProps = {
    caption: 'Caption',
    isModal: false,
    showBackButton: false,
    showHistoryButton: true,
    onGoBack: () => {}
};
