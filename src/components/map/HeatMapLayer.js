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

export default function HeatMapLayer({
  id,
  coordinates,
  properties,
  heatmapAttributes,
}) {
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

  const MAX_ZOOM_LEVEL = 20;

  const HeatMapLayerData = {
    id,
    maxzoom: MAX_ZOOM_LEVEL,
    type: 'heatmap',
    paint: {
      // 'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 0, 1, MAX_ZOOM_LEVEL, 3],
      'heatmap-weight': [
        'interpolate',
        ['exponential', 1 / 2],
        ['get', 'ratio'],
        0,
        0,
        186,
        1,
      ],
      'heatmap-color': [
        'interpolate',
        ['linear'],
        ['heatmap-density'],
        0,
        'rgba(33,102,172, 0)',
        0.1,
        'rgb(33,102,172)',
        0.2,
        'rgb(33,102,172)',
        0.5,
        'rgb(127,255,0)',
        0.7,
        'rgb(255,255,90)',
        0.8,
        'rgb(239,155,101)',
        0.85,
        'rgb(250,180,98)',
        1,
        'rgb(250,90,90)',
      ],
      'heatmap-radius': [
        'interpolate',
        ['exponential', 1.25],
        ['zoom'],
        3,
        2,
        10,
        100,
      ],
      'heatmap-opacity': 0.7,
      ...heatmapAttributes,
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
  heatmapAttributes: {},
};

HeatMapLayer.propTypes = {
  id: PropTypes.string,
  coordinates: PropTypes.array.isRequired,
  properties: PropTypes.array.isRequired,
  heatmapAttributes: PropTypes.object,
};
