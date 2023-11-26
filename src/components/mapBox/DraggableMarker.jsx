import React from 'react';

import PropTypes from 'prop-types';
import { Marker } from 'react-map-gl';

import './customMapbox-gl.css';

/**
 * @author Matheus Fontes
 * @description Draggable Marker para mapa MapBox
 * @property {object} coordinates Coordenadas inciais do Marker, no formato {lat: valor, lng: valor} ou um array [valorLng, valorLat]
 * @property {function} onDragStart Função ao pegar o Marker para arrastar, retorna posição do marker no formato {lat: valor, lng: valor}
 * @property {function} onDrag Função ao arrastar o Marker, retorna posição do marker no formato {lat: valor, lng: valor}
 * @property {function} onDragEnd Função ao soltar o Marker, retorna posição do marker no formato {lat: valor, lng: valor}
 * @since 04/07/2022
 */

export default function DraggableMarker({
    coordinates,
    onDragStart,
    onDrag,
    onDragEnd,
    anchor,
    children,
    ...otherProps
}) {
    const handleDragStart = (event) => {
        onDragStart(event.lngLat);
    };

    const handleDrag = (event) => {
        onDrag(event.lngLat);
    };

    const handleDragEnd = (event) => {
        onDragEnd(event.lngLat);
    };

    const getCenter = () => {
        if (!Array.isArray(coordinates)) {
            return {
                longitude:
                    coordinates.lng || coordinates.lon || coordinates.longitude,
                latitude: coordinates.lat || coordinates.latitude,
            };
        }

        return {
            longitude: coordinates[0],
            latitude: coordinates[1],
        };
    };

    return (
        <Marker
            {...getCenter()}
            draggable
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            anchor={anchor}
            {...otherProps}
            style={{
                position: 'absolute',
                width: '30px',
                height: '30px',
            }}
        >
            {children}
        </Marker>
    );
}

DraggableMarker.defaultProps = {
    coordinates: [-50.2556, -13.5444],
    onDragStart: () => {},
    onDrag: () => {},
    onDragEnd: () => {},
    anchor: 'bottom',
    children: null,
};

DraggableMarker.propTypes = {
    coordinates: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    children: PropTypes.node,
    onDragStart: PropTypes.func,
    onDrag: PropTypes.func,
    onDragEnd: PropTypes.func,
    anchor: PropTypes.string,
};
