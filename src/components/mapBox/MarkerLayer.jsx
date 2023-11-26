import React from 'react';

import PropTypes from 'prop-types';
import { Layer, Source } from 'react-map-gl';

/**
 * @author Matheus Fontes
 * @description Camada pra desenhar linhas no mapa do MapBox
 * @property {string} id Identificação única da camada
 * @property {array} coordinates Array de vértices para os markers, cada vértice no formato [valorLng, valorLat]
 * @property {array} properties Array com as propriedades dos markers, como Icon. Aqui vai outras propriedades que queira acessar em eventos, como click
 * @since 19/07/2022
 */

export default function MarkerLayer({ id, coordinates, properties, layout }) {
    const layerData = {
        type: 'FeatureCollection',
        features: [],
    };

    coordinates.forEach((coord, index) => {
        layerData.features.push({
            type: 'Feature',
            properties: properties[index],
            geometry: {
                type: 'Point',
                coordinates: coordinates[index],
            },
        });
    });

    return (
        <Source id={id} type="geojson" data={layerData}>
            <Layer
                id={id}
                type="symbol"
                sourceId={id}
                layout={{
                    'icon-image': '{icon}',
                    'icon-size': ['get', 'size'],
                    'icon-allow-overlap': true,
                    'icon-anchor': 'bottom',
                    ...layout,
                }}
            />
        </Source>
    );
}

MarkerLayer.defaultProps = {
    id: undefined,
    layout: {},
};

MarkerLayer.propTypes = {
    id: PropTypes.string,
    coordinates: PropTypes.array.isRequired,
    properties: PropTypes.array.isRequired,
    layout: PropTypes.object,
};
