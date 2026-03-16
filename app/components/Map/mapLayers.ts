import type { LayerSpecification } from 'mapbox-gl'

export const trailLineLayer: LayerSpecification = {
  id: 'journey-trail-line',
  type: 'line',
  source: 'journey-trail',
  layout: {
    'line-cap': 'round',
    'line-join': 'round',
  },
  paint: {
    'line-color': '#6F4E37',
    'line-width': [
      'interpolate',
      ['linear'],
      ['zoom'],
      3,
      2,
      9,
      4,
      13,
      6,
    ],
    'line-opacity': 0.75,
  },
}

export const pastStopsLayer: LayerSpecification = {
  id: 'journey-past-stops',
  type: 'circle',
  source: 'journey-stops',
  filter: ['==', ['get', 'isCurrent'], false],
  paint: {
    'circle-radius': [
      'interpolate',
      ['linear'],
      ['zoom'],
      3,
      3,
      10,
      5,
      13,
      6,
    ],
    'circle-color': '#8D6E63',
    'circle-stroke-color': '#3E2723',
    'circle-stroke-width': 1,
    'circle-opacity': ['coalesce', ['get', 'ageOpacity'], 0.35],
  },
}

export const currentStopLayer: LayerSpecification = {
  id: 'journey-current-stop',
  type: 'circle',
  source: 'journey-stops',
  filter: ['==', ['get', 'isCurrent'], true],
  paint: {
    'circle-radius': [
      'interpolate',
      ['linear'],
      ['zoom'],
      3,
      5,
      10,
      8,
      13,
      10,
    ],
    'circle-color': '#E8D8B9',
    'circle-stroke-color': '#3E2723',
    'circle-stroke-width': 2,
    'circle-opacity': 1,
    'circle-blur': 0.08,
  },
}
