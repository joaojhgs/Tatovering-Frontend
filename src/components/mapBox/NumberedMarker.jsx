import React from 'react';

import PropTypes from 'prop-types';

import './customMapbox-gl.css';

export default function NumberedMarker({
    index,
    backgroundColor,
    color,
    size,
}) {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxSizing: 'border-box',
                width: `${size}px`,
                height: `${size}px`,
                color,
                background: backgroundColor,
                border: 'solid 2px',
                borderRadius: '0 70% 70%',
                boxShadow: '0 0 2px #000',
                cursor: 'pointer',
                transformOrigin: '0 0',
                transform: 'rotateZ(-135deg)',
                fontWeight: 'bold',
                position: 'absolute',
            }}
        >
            <div
                style={{
                    transform: 'rotateZ(135deg)',
                    textShadow: '#0009 0 0 4px',
                }}
            >
                {index}
            </div>
        </div>
    );
}

NumberedMarker.defaultProps = {
    backgroundColor: '#1890ff',
    color: '#fff',
    size: 30,
};

NumberedMarker.propTypes = {
    index: PropTypes.number.isRequired,
    backgroundColor: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.number,
};
