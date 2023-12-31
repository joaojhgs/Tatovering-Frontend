import React, { useEffect, useRef } from 'react';

import mapboxgl from 'mapbox-gl';
import PropTypes from 'prop-types';
import Map, {
  FullscreenControl,
  Marker,
  NavigationControl,
} from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

import HeatMapLayer from './HeatMapLayer';
import LineLayer from './LineLayer';
import MarkerLayer from './MarkerLayer';
import PolygonLayer from './PolygonLayer';
import PolygonLayer3D from './PolygonLayer3D';

const tokenMapbox =
  'pk.eyJ1IjoiYXJpbmRhbTE5OTMiLCJhIjoiY2p0bnU2dmtoMHp4ZTN5cGxmZXJpa3BpdiJ9._9GLi1K1ERIMzwpzWSL-PA';

/**
 * @author Matheus Fontes
 * @description Mapa do MapBox
 * @property {object} center Coordenadas iniciais do Mapa, no formato {lat: valor, lng: valor} ou um array [valorLng, valorLat]
 * @property {string} type Estilização do mapa. {streets, outdoors, light, dark, satellite, satelliteStreets, navigationDay, navigationNight}
 * @property {string} height Altura do mapa
 * @property {number} zoom Valor inicial do zoom no mapa
 * @property {func} onClick Funcao executada ao clicar no mapa, retorna o evento com latLng dentro
 * @property {func} onDragStart Funcao executada logo ao arrastar o mapa, retorna o evento com latLng dentro
 * @property {func} onDrag Funcao executada enquanto arrastar o mapa, retorna o evento com latLng dentro
 * @property {func} onDragEnd Funcao executada após arrastar o mapa, retorna o evento com latLng dentro
 * @property {array} markers Array com markers no formato { icon, position: { lng, lat }, outrasPropriedades }, propriedades são para acesso em eventos como click
 * @property {func} markerOnClick Funcao para executar ao clicar em um dos markers, retorna o mesmo objeto definido no marker
 * @property {array} lines Array com linhas no formato { color, path: [[lng, lat], [lng, lat], ...], outrasPropriedades }, propriedades são para acesso em eventos como click
 * @property {func} lineOnClick Funcao para executar ao clicar em uma das linhas, retorna o mesmo objeto definido na linha
 * @property {array} polygons Array com poligonos no formato { path: [[lng, lat], [lng, lat], ...], outrasPropriedades }, propriedades são para acesso em eventos como click
 * @property {func} polygonOnClick Funcao para executar ao clicar em um dos poligonos, retorna o mesmo objeto definido no poligono
 * @property {func} onMapLoad Funcao executada no useEffect do mapa, retorna uma referencia ao mapa
 * @property {func} onMapUnload Funcao executada no return do useEffect do mapa, retorna uma referencia ao mapa
 * @property {array} fitMapToCoordinates Mapa "voa" para encaixar todos markers no mapa, toda vez que atualizar o array.
 * @property {array} customMarkers Array com markers para utilizar um componente customizado, cada objeto do array recebe { sprite: <ComponenteParaUtilizar>, onClick: e => FuncaoParaUtilizar() }
 * @property {bool} showFullScreenButton Boolean para mostrar o botão de FullScreen no top-right do mapa
 * @property {bool} showZoomButtons Boolean para mostrar o botões de Zoom no bottom-right do mapa
 * @property {bool} showCompassButton Boolean para mostrar o botão de Compass no bottom-right do mapa
 * @since 05/07/2022
 */

/*
    Funções úteis:

    - getDirections:
        Retorna a rota entre markers determinados
        Parâmetros:
            Array com posicoes no formato { position: { longitude, latitude } }
            callBack caso de sucesso, retorna a response
            callBack caso de erro, retorna o erro
            callback após executar, independente de erro ou sucesso

    - getInformacoesLocalizacao:
        Retorna informacoes de uma localizacao, como endereco, bairro etc
        Parâmetros:
            String com localizacao, pode ser coordenadas ou endereco
            callBack caso de sucesso, retorna a response
            callBack caso de erro, retorna o erro
            callback após executar, independente de erro ou sucesso

*/

export default function MapBoxMap({
  center,
  type,
  children,
  height,
  zoom,
  style,
  markers,
  lines,
  polygons,
  polygons3d,
  heatMapMarkers,
  markerOnClick,
  lineOnClick,
  polygonOnClick,
  heatMapMarkerOnClick,
  onDragStart,
  onDrag,
  onDragEnd,
  additionalLayers,
  onClick,
  onMapLoad,
  onMapUnload,
  fitMapToCoordinates,
  markersLayout,
  maxZoom,
  customMarkers,
  showFullScreenButton,
  showZoomButtons,
  showCompassButton,
  showSearchBar,
  searchBarWidth,
  flyTo,
  heatmapAttributes,
  minZoom,
  ...otherProps
}: any) {
  const mapRef: any = useRef();

  const mapStyle = {
    streets: 'mapbox://styles/mapbox/streets-v9',
    outdoors: 'mapbox://styles/mapbox/outdoors-v11',
    light: 'mapbox://styles/mapbox/light-v10',
    dark: 'mapbox://styles/mapbox/dark-v10',
    satellite: 'mapbox://styles/mapbox/satellite-v9',
    satelliteStreets: 'mapbox://styles/mapbox/satellite-streets-v11',
    navigationDay: 'mapbox://styles/mapbox/navigation-day-v1',
    navigationNight: 'mapbox://styles/mapbox/navigation-night-v1',
  };

  const formatCoords = (coords: any) => {
    if (!Array.isArray(coords)) {
      return {
        longitude: coords.lng || coords.lon || coords.longitude,
        latitude: coords.lat || coords.latitude,
      };
    }

    return {
      longitude: coords[0],
      latitude: coords[1],
    };
  };

  const reloadSize = () => {
    if (mapRef.current) {
      mapRef.current.resize();
    }
  };

  const onLoad = ({ target: map }: { target: any }) => {
    reloadSize();
  };

  const loadImages = () => {
    const imagesToLoad: any[] = [];

    markers.forEach((marker: any) => {
      const icone = marker.icon;
      if (!imagesToLoad.includes(icone)) {
        imagesToLoad.push(icone);
      }
    });

    imagesToLoad.forEach((img) => {
      if (mapRef.current) {
        if (!mapRef.current.hasImage(img)) {
          mapRef.current.loadImage(img, (error: any, image: any) => {
            if (error) throw error;
            if (!mapRef.current.hasImage(img))
              mapRef.current.addImage(img, image);
          });
        }
      }
    });
  };

  const handleDragStart = (event: any) => {
    onDragEnd(event.viewState);
  };

  const handleDrag = (event: any) => {
    onDrag(event.viewState);
  };

  const handleDragEnd = (event: any) => {
    onDragStart(event.viewState);
  };

  const mapClick = (e: any) => {
    if (!e.defaultPrevented) {
      onClick(e);
    }
  };

  const lineClick = (e: any) => {
    if (!e.defaultPrevented) {
      e.preventDefault();
      lineOnClick(e.features[0]);
    }
  };

  const markerClick = (e: any) => {
    if (!e.defaultPrevented) {
      e.preventDefault();
      markerOnClick(e.features[0]);
    }
  };

  const heatMapMarkerClick = (e: any) => {
    if (!e.defaultPrevented) {
      e.preventDefault();
      heatMapMarkerOnClick(e.features[0]);
    }
  };

  const polygonClick = (e: any) => {
    if (!e.defaultPrevented) {
      e.preventDefault();
      polygonOnClick(e.features[0]);
    }
  };

  const loadMarkers = () => {
    const markerLayerData: any = {
      coordinates: [],
      properties: [],
    };

    markers.forEach((marker: any) => {
      const { longitude, latitude } = formatCoords(marker.position || marker);
      markerLayerData.coordinates.push([longitude, latitude]);
      markerLayerData.properties.push({
        ...marker,
        icon: marker.icon,
        size: marker.size || 1,
      });
    });

    return (
      <MarkerLayer
        id="MarkerLayer"
        coordinates={markerLayerData.coordinates}
        properties={markerLayerData.properties}
        layout={markersLayout}
      />
    );
  };

  // const loadLines = () => {
  //   const lineLayerData = {
  //     coordinates: [],
  //     properties: [],
  //   };

  //   lines.forEach((line) => {
  //     lineLayerData.coordinates.push(line.path);
  //     lineLayerData.properties.push({
  //       ...line,
  //     });
  //   });

  //   return (
  //     <LineLayer
  //       id="LineLayer"
  //       coordinates={lineLayerData.coordinates}
  //       properties={lineLayerData.properties}
  //     />
  //   );
  // };

  // const loadPolygons = () => {
  //   const polygonLayerData = {
  //     coordinates: [],
  //     properties: [],
  //   };

  //   polygons.forEach((polygon) => {
  //     polygonLayerData.coordinates.push(polygon.path);
  //     polygonLayerData.properties.push({
  //       ...polygon,
  //       color: polygon.color || '#5bfca9',
  //     });
  //   });

  //   return (
  //     <PolygonLayer
  //       id="PolygonLayer"
  //       coordinates={polygonLayerData.coordinates}
  //       properties={polygonLayerData.properties}
  //     />
  //   );
  // };

  // const load3DPolygons = () => {
  //   const polygonLayerData = {
  //     coordinates: [],
  //     properties: [],
  //   };

  //   polygons3d.forEach((polygon) => {
  //     polygonLayerData.coordinates.push(polygon.path);
  //     polygonLayerData.properties.push({
  //       ...polygon,
  //       color: polygon.color || '#5bfca9',
  //     });
  //   });

  //   return (
  //     <PolygonLayer3D
  //       id="PolygonLayer3D"
  //       coordinates={polygonLayerData.coordinates}
  //       properties={polygonLayerData.properties}
  //     />
  //   );
  // };

  // const loadHeatMap = () => {
  //   const heatMapLayerData = {
  //     coordinates: [],
  //     properties: [],
  //   };

  //   heatMapMarkers.forEach((marker) => {
  //     const { longitude, latitude } = formatCoords(marker.position || marker);
  //     heatMapLayerData.coordinates.push([longitude, latitude]);
  //     heatMapLayerData.properties.push({
  //       ...marker,
  //     });
  //   });

  //   return (
  //     <HeatMapLayer
  //       id="HeatMapLayer"
  //       coordinates={heatMapLayerData.coordinates}
  //       properties={heatMapLayerData.properties}
  //       heatmapAttributes={heatmapAttributes}
  //     />
  //   );
  // };

  // const loadCustomMarkers = () =>
  //   customMarkers.map((marker) => (
  //     <Marker
  //       {...formatCoords(marker.position || marker)}
  //       anchor="bottom"
  //       onClick={marker.onClick || (() => {})}
  //       {...marker.properties}
  //     >
  //       {marker.sprite}
  //     </Marker>
  //   ));

  const loadButtons = () => (
    <>
      {showFullScreenButton && <FullscreenControl />}
      <NavigationControl
        position="bottom-right"
        showZoom={showZoomButtons}
        showCompass={showCompassButton}
      />
    </>
  );

  const createEvents = () => {
    onMapLoad(mapRef.current);
    mapRef.current.on('click', 'MarkerLayer', markerClick);
    mapRef.current.on('click', 'LineLayer', lineClick);
    mapRef.current.on('click', 'PolygonLayer', polygonClick);
    mapRef.current.on('click', 'HeatMapLayer', heatMapMarkerClick);
    mapRef.current.on('click', mapClick);
  };

  const deleteEvents = () => {
    onMapUnload(mapRef.current);
    mapRef.current.off('click', 'MarkerLayer', markerClick);
    mapRef.current.off('click', 'LineLayer', lineClick);
    mapRef.current.off('click', 'PolygonLayer', polygonClick);
    mapRef.current.off('click', 'HeatMapLayer', heatMapMarkerClick);
    mapRef.current.off('click', mapClick);
  };

  useEffect(() => {
    if (mapRef.current) {
      loadImages();
      createEvents();
    }

    return () => {
      if (mapRef.current) {
        deleteEvents();
      }
    };
  });

  const getMinMaxCoords = (coords: any) => {
    let minLat = coords[0][1];
    let minLng = coords[0][0];
    let maxLat = coords[0][1];
    let maxLng = coords[0][0];

    coords.forEach((coord: any) => {
      minLng = coord[0] < minLng ? coord[0] : minLng;
      minLat = coord[1] < minLat ? coord[1] : minLat;
      maxLng = coord[0] > maxLng ? coord[0] : maxLng;
      maxLat = coord[1] > maxLat ? coord[1] : maxLat;
    });

    return [
      [minLng, minLat],
      [maxLng, maxLat],
    ];
  };

  const fitToBounds = () => {
    mapRef.current.fitBounds(getMinMaxCoords(fitMapToCoordinates), {
      padding: 30,
    });
  };

  useEffect(() => {
    if (fitMapToCoordinates.length) {
      fitToBounds();
    }
  }, [fitMapToCoordinates]);

  useEffect(() => {
    console.log(flyTo);
    if (Object.keys(flyTo).length > 0 && mapRef.current) {
      mapRef.current.flyTo(flyTo);
    }
  }, [flyTo]);

  return (
    <Map
      ref={mapRef}
      style={{
        height,
        ...style,
      }}
      // projection="globe"
      // mapStyle={mapStyle[type]}
      mapStyle="mapbox://styles/mapbox/light-v10"
      initialViewState={{
        ...formatCoords(center),
        zoom,
        maxZoom,
      }}
      mapboxAccessToken={tokenMapbox}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      onLoad={onLoad}
      minZoom={minZoom}
      {...otherProps}
    >
      {loadButtons()}
      {loadMarkers()}
      {children}
    </Map>
  );
}

MapBoxMap.defaultProps = {
  // center: [-52.3811, -24.0438],
  center: [-50.2556, -13.5444],
  type: 'satellite',
  children: <></>,
  height: '500px',
  style: {},
  zoom: 11,
  initalValues: {},
  markers: [],
  lines: [],
  polygons: [],
  polygons3d: [],
  heatMapMarkers: [],
  onDragStart: () => {},
  onDrag: () => {},
  onDragEnd: () => {},
  onClick: () => {},
  additionalLayers: [],
  markerOnClick: () => {},
  lineOnClick: () => {},
  polygonOnClick: () => {},
  heatMapMarkerOnClick: () => {},
  onMapLoad: () => {},
  onMapUnload: () => {},
  fitMapToCoordinates: [],
  markersLayout: {},
  maxZoom: 20,
  customMarkers: [],
  showFullScreenButton: true,
  showZoomButtons: true,
  showCompassButton: true,
  showSearchBar: false,
  searchBarWidth: '400px',
  flyTo: {},
  heatmapAttributes: {},
  minZoom: 3,
};

MapBoxMap.propTypes = {
  center: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  type: PropTypes.string,
  children: PropTypes.node,
  height: PropTypes.string,
  style: PropTypes.object,
  zoom: PropTypes.number,
  initalValues: PropTypes.object,
  markers: PropTypes.array,
  lines: PropTypes.array,
  polygons: PropTypes.array,
  polygons3d: PropTypes.array,
  heatMapMarkers: PropTypes.array,
  onDragStart: PropTypes.func,
  onDrag: PropTypes.func,
  onDragEnd: PropTypes.func,
  onClick: PropTypes.func,
  additionalLayers: PropTypes.array,
  markerOnClick: PropTypes.func,
  lineOnClick: PropTypes.func,
  polygonOnClick: PropTypes.func,
  heatMapMarkerOnClick: PropTypes.func,
  onMapLoad: PropTypes.func,
  onMapUnload: PropTypes.func,
  fitMapToCoordinates: PropTypes.array,
  markersLayout: PropTypes.object,
  maxZoom: PropTypes.number,
  customMarkers: PropTypes.array,
  showFullScreenButton: PropTypes.bool,
  showZoomButtons: PropTypes.bool,
  showCompassButton: PropTypes.bool,
  showSearchBar: PropTypes.bool,
  minZoom: PropTypes.number,
  searchBarWidth: PropTypes.string,
  flyTo: PropTypes.object,
  heatmapAttributes: PropTypes.object,
};
