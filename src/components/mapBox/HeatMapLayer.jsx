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

export default function HeatMapLayer({ id, coordinates, properties }) {
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

    const MAX_ZOOM_LEVEL = 23;

    const HeatMapLayerData = {
        id,
        maxzoom: MAX_ZOOM_LEVEL,
        type: 'heatmap',
        paint: {
            'heatmap-intensity': [
                'interpolate',
                ['linear'],
                ['zoom'],
                0,
                1,
                MAX_ZOOM_LEVEL,
                3,
            ],
            'heatmap-color': [
                'interpolate',
                ['linear'],
                ['heatmap-density'],
                0,
                'rgba(33,102,172,0)',
                0.3,
                'rgb(127,255,0)',
                0.6,
                'rgb(255,255,90)',
                // 0.6,
                // 'rgb(239,155,101)',
                0.8,
                'rgb(250,180,98)',
                1,
                'rgb(250,90,90)',
            ],
            'heatmap-radius': [
                'interpolate',
                ['linear'],
                ['zoom'],
                0,
                10,
                MAX_ZOOM_LEVEL,
                40,
            ],
            'heatmap-opacity': 0.7,
        },
    };

    return (
        <Source id={id} type="geojson" data={layerData} tolerance={0}>
            <Layer sourceId={id} {...HeatMapLayerData} />
        </Source>
    );
}

HeatMapLayer.defaultProps = {
    id: undefined,
};

HeatMapLayer.propTypes = {
    id: PropTypes.string,
    coordinates: PropTypes.array.isRequired,
    properties: PropTypes.array.isRequired,
};
