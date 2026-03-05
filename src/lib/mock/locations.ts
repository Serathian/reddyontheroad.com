import type { RotrLocation } from '$lib/types'

export const mockLocations: Record<string, RotrLocation[]> = {
  'week-1-oulu': [
    { id: 101, name: 'Oulu City Centre', place_type: 'city', marker_type: 'city-stop', latitude: 65.0121, longitude: 25.4651, country: 'Finland', description: 'Our starting point.', updatedAt: '2022-07-04T08:00:00.000Z', createdAt: '2022-07-04T08:00:00.000Z' },
    { id: 102, name: 'Virpiniemi Campsite', place_type: 'accommodation', marker_type: 'camp', latitude: 65.0785, longitude: 25.2904, country: 'Finland', updatedAt: '2022-07-04T08:00:00.000Z', createdAt: '2022-07-04T08:00:00.000Z' },
    { id: 103, name: 'Nallikari Beach', place_type: 'beach', marker_type: 'beach', latitude: 65.0271, longitude: 25.3733, country: 'Finland', updatedAt: '2022-07-04T08:00:00.000Z', createdAt: '2022-07-04T08:00:00.000Z' },
  ],
  'week-2-stockholm': [
    { id: 201, name: 'Stockholm Old Town', place_type: 'city', marker_type: 'city-stop', latitude: 59.3251, longitude: 18.0711, country: 'Sweden', updatedAt: '2022-07-11T08:00:00.000Z', createdAt: '2022-07-11T08:00:00.000Z' },
    { id: 202, name: 'Camping Stockholm', place_type: 'accommodation', marker_type: 'camp', latitude: 59.3128, longitude: 18.0045, country: 'Sweden', updatedAt: '2022-07-11T08:00:00.000Z', createdAt: '2022-07-11T08:00:00.000Z' },
    { id: 203, name: 'Djurgården', place_type: 'park', marker_type: 'viewpoint', latitude: 59.3271, longitude: 18.1099, country: 'Sweden', updatedAt: '2022-07-11T08:00:00.000Z', createdAt: '2022-07-11T08:00:00.000Z' },
    { id: 204, name: 'Vasa Museum', place_type: 'landmark', marker_type: 'city-stop', latitude: 59.3280, longitude: 18.0912, country: 'Sweden', updatedAt: '2022-07-11T08:00:00.000Z', createdAt: '2022-07-11T08:00:00.000Z' },
  ],
  'week-3-copenhagen': [
    { id: 301, name: 'Copenhagen Central', place_type: 'city', marker_type: 'city-stop', latitude: 55.6761, longitude: 12.5683, country: 'Denmark', updatedAt: '2022-07-18T08:00:00.000Z', createdAt: '2022-07-18T08:00:00.000Z' },
    { id: 302, name: 'Nyhavn', place_type: 'landmark', marker_type: 'city-stop', latitude: 55.6796, longitude: 12.5896, country: 'Denmark', updatedAt: '2022-07-18T08:00:00.000Z', createdAt: '2022-07-18T08:00:00.000Z' },
    { id: 303, name: 'Absalon Camping', place_type: 'accommodation', marker_type: 'camp', latitude: 55.6544, longitude: 12.5067, country: 'Denmark', updatedAt: '2022-07-18T08:00:00.000Z', createdAt: '2022-07-18T08:00:00.000Z' },
  ],
  'week-4-germany': [
    { id: 401, name: 'Hamburg Reeperbahn', place_type: 'city', marker_type: 'city-stop', latitude: 53.5495, longitude: 9.9653, country: 'Germany', updatedAt: '2022-07-25T08:00:00.000Z', createdAt: '2022-07-25T08:00:00.000Z' },
    { id: 402, name: 'Hamburg Stellingen Camping', place_type: 'accommodation', marker_type: 'camp', latitude: 53.5952, longitude: 9.9204, country: 'Germany', updatedAt: '2022-07-25T08:00:00.000Z', createdAt: '2022-07-25T08:00:00.000Z' },
    { id: 403, name: 'Cologne Cathedral', place_type: 'landmark', marker_type: 'viewpoint', latitude: 50.9413, longitude: 6.9583, country: 'Germany', updatedAt: '2022-07-25T08:00:00.000Z', createdAt: '2022-07-25T08:00:00.000Z' },
    { id: 404, name: 'Rhine Valley Parking', place_type: 'park', marker_type: 'parking', latitude: 50.2667, longitude: 7.5500, country: 'Germany', updatedAt: '2022-07-25T08:00:00.000Z', createdAt: '2022-07-25T08:00:00.000Z' },
  ],
  'week-5-strasbourg': [
    { id: 501, name: 'Strasbourg Petite France', place_type: 'city', marker_type: 'city-stop', latitude: 48.5734, longitude: 7.7521, country: 'France', updatedAt: '2022-08-01T08:00:00.000Z', createdAt: '2022-08-01T08:00:00.000Z' },
    { id: 502, name: 'Camping de la Montagne Verte', place_type: 'accommodation', marker_type: 'camp', latitude: 48.5760, longitude: 7.7101, country: 'France', updatedAt: '2022-08-01T08:00:00.000Z', createdAt: '2022-08-01T08:00:00.000Z' },
    { id: 503, name: 'Alsace Wine Route', place_type: 'landmark', marker_type: 'viewpoint', latitude: 48.1683, longitude: 7.2714, country: 'France', updatedAt: '2022-08-01T08:00:00.000Z', createdAt: '2022-08-01T08:00:00.000Z' },
  ],
  'week-6-perpignan': [
    { id: 601, name: 'Perpignan Old City', place_type: 'city', marker_type: 'city-stop', latitude: 42.6886, longitude: 2.8948, country: 'France', updatedAt: '2022-08-08T08:00:00.000Z', createdAt: '2022-08-08T08:00:00.000Z' },
    { id: 602, name: 'Camping du Roussillon', place_type: 'accommodation', marker_type: 'camp', latitude: 42.7012, longitude: 2.9135, country: 'France', updatedAt: '2022-08-08T08:00:00.000Z', createdAt: '2022-08-08T08:00:00.000Z' },
    { id: 603, name: 'Col du Perthus — Pyrenees Crossing', place_type: 'mountain', marker_type: 'viewpoint', latitude: 42.4620, longitude: 2.8680, country: 'France/Spain', updatedAt: '2022-08-08T08:00:00.000Z', createdAt: '2022-08-08T08:00:00.000Z' },
  ],
  'week-7-barcelona': [
    { id: 701, name: 'La Barceloneta', place_type: 'beach', marker_type: 'beach', latitude: 41.3769, longitude: 2.1897, country: 'Spain', updatedAt: '2022-08-15T08:00:00.000Z', createdAt: '2022-08-15T08:00:00.000Z' },
    { id: 702, name: 'Sagrada Família', place_type: 'landmark', marker_type: 'viewpoint', latitude: 41.4036, longitude: 2.1744, country: 'Spain', updatedAt: '2022-08-15T08:00:00.000Z', createdAt: '2022-08-15T08:00:00.000Z' },
    { id: 703, name: 'Camping Tres Estrellas', place_type: 'accommodation', marker_type: 'camp', latitude: 41.3209, longitude: 2.0856, country: 'Spain', updatedAt: '2022-08-15T08:00:00.000Z', createdAt: '2022-08-15T08:00:00.000Z' },
    { id: 704, name: 'Passeig de Gràcia', place_type: 'city', marker_type: 'city-stop', latitude: 41.3917, longitude: 2.1649, country: 'Spain', updatedAt: '2022-08-15T08:00:00.000Z', createdAt: '2022-08-15T08:00:00.000Z' },
  ],
  'week-8-malaga': [
    { id: 801, name: 'Málaga Old Town', place_type: 'city', marker_type: 'city-stop', latitude: 36.7213, longitude: -4.4214, country: 'Spain', updatedAt: '2022-08-22T08:00:00.000Z', createdAt: '2022-08-22T08:00:00.000Z' },
    { id: 802, name: 'Playa de la Malagueta', place_type: 'beach', marker_type: 'beach', latitude: 36.7153, longitude: -4.4058, country: 'Spain', updatedAt: '2022-08-22T08:00:00.000Z', createdAt: '2022-08-22T08:00:00.000Z' },
    { id: 803, name: 'Camping Málaga', place_type: 'accommodation', marker_type: 'camp', latitude: 36.7339, longitude: -4.3712, country: 'Spain', updatedAt: '2022-08-22T08:00:00.000Z', createdAt: '2022-08-22T08:00:00.000Z' },
    { id: 804, name: 'Mirador de Gibralfaro', place_type: 'landmark', marker_type: 'viewpoint', latitude: 36.7222, longitude: -4.4100, country: 'Spain', updatedAt: '2022-08-22T08:00:00.000Z', createdAt: '2022-08-22T08:00:00.000Z' },
  ],
}
