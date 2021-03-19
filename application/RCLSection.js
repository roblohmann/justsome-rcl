import React from 'react';
import PropTypes from 'prop-types';
import './RCLSection.scss';

export default function RCLSection(props) {
    return (
        <div className='rcl-section'>
            <div className='rcl-section-main'>
                <div className='rcl-section-main-title'>
                    <span>{props.caption}</span>
                </div>
            </div>
            <div className='rcl-section-body'>{props.children}</div>
        </div>
    );
}

RCLSection.propTypes = {
    caption: PropTypes.string
};

RCLSection.defaultProps = {
    caption: 'Caption Section'
};
