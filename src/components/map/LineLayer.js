import React from 'react';
import { Source, Layer } from 'react-map-gl';
import PropTypes from 'prop-types';

/**
 * @author Matheus Fontes
 * @description Camada pra desenhar linhas no mapa do MapBox
 * @property {string} id Identificação única da camada
 * @property {array} coordinates Array de arrays de vértices para as linhas, cada vértice no formato [valorLng, valorLat]
 * @property {array} properties Array com as propriedades das linhas, como color. Aqui vai outras propriedades que queira acessar em eventos, como click
 * @property {number} lineWidth Largura da linha
 * @since 07/07/2022
 */

export default function LineLayer({
    id,
    coordinates,
    lineWidth,
    lineOpacity,
    properties,
}) {

    const layerData = {
        type: 'FeatureCollection',
        features: [],
    };

    if (Array.isArray(properties)) {
        coordinates.forEach((coord, index) => {
            layerData.features.push(
                {
                    type: 'Feature',
                    properties: properties[index],
                    geometry: {
                        type: 'LineString',
                        coordinates: coord,
                    },
                },
            );
        });
    } else {
        layerData.features.push(
            {
                type: 'Feature',
                properties,
                geometry: {
                    type: 'LineString',
                    coordinates,
                },
            },
        );
    }

    return (
        <Source id={id} type="geojson" data={layerData}>
            <Layer
                id={id}
                type="line"
                sourceId={id}
                layout={{
                    'line-join': 'round',
                    'line-cap': 'round',
                }}
                paint={{
                    'line-color': ['get', 'color'] || '#888',
                    'line-width': lineWidth,
                    'line-opacity': lineOpacity,
                }}
            />
        </Source>
    );
}

LineLayer.defaultProps = {
    coordinates: [],
    lineWidth: 8,
    id: undefined,
    lineOpacity: 0.5,
    properties: {},
};

LineLayer.propTypes = {
    id: PropTypes.string,
    coordinates: PropTypes.array,
    lineWidth: PropTypes.number,
    lineOpacity: PropTypes.number,
    properties: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array,
    ]),
};
