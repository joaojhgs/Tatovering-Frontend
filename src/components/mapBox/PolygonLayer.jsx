import React from 'react';

import PropTypes from 'prop-types';
import { Layer, Source } from 'react-map-gl';

/**
 * @author Matheus Fontes
 * @description Camada pra desenhar linhas no mapa do MapBox
 * @property {string} id Identificação única da camada
 * @property {array} coordinates Array de arrays de vértices para os poligonos, cada vértice no formato [valorLng, valorLat]
 * @property {array} properties Array com as propriedades dos poligonos, como color. Aqui vai outras propriedades que queira acessar em eventos, como click
 * @since 07/07/2022
 */

export default function PolygonLayer({
    id,
    coordinates,
    fillOpacity,
    properties,
}) {
    const layerData = {
        type: 'FeatureCollection',
        features: [],
    };

    if (Array.isArray(properties)) {
        coordinates.forEach((coord, index) => {
            layerData.features.push({
                type: 'Feature',
                properties: properties[index],
                geometry: {
                    type: 'Polygon',
                    coordinates: [coord],
                },
            });
        });
    } else {
        layerData.features.push({
            type: 'Feature',
            properties,
            geometry: {
                type: 'Polygon',
                coordinates: [coordinates],
            },
        });
    }

    return (
        <Source id={id} type="geojson" data={layerData}>
            <Layer
                id={id}
                type="fill"
                sourceId={id}
                paint={{
                    'fill-color': ['get', 'color'],
                    'fill-opacity': fillOpacity,
                }}
            />
        </Source>
    );
}

PolygonLayer.defaultProps = {
    coordinates: [],
    id: undefined,
    fillOpacity: 0.5,
    properties: {},
};

PolygonLayer.propTypes = {
    id: PropTypes.string,
    coordinates: PropTypes.array,
    fillOpacity: PropTypes.number,
    properties: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
