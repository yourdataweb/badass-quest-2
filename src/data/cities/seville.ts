import type { City, LocationPOI } from '../../store/types';

const HOME: LocationPOI = {
  id: 'seville-home',
  type: 'home',
  position: { lat: 37.3864, lng: -6.0025 },
  address: 'Calle Betis, Triana, Sevilla',
  sprite: 'home',
};

const locations: LocationPOI[] = [
  HOME,
  {
    id: 'seville-plaza-espana',
    type: 'plaza',
    position: { lat: 37.3773, lng: -5.9868 },
    address: 'Avenida de Isabel la Católica, Sevilla',
    sprite: 'plaza',
  },
  {
    id: 'seville-plaza-nueva',
    type: 'plaza',
    position: { lat: 37.3907, lng: -5.9940 },
    address: 'Plaza Nueva, Sevilla',
    sprite: 'plaza',
  },
  {
    id: 'seville-plaza-salvador',
    type: 'plaza',
    position: { lat: 37.3908, lng: -5.9907 },
    address: 'Plaza del Salvador, Sevilla',
    sprite: 'plaza',
  },
  {
    id: 'seville-plaza-setas',
    type: 'plaza',
    position: { lat: 37.3935, lng: -5.9914 },
    address: 'Plaza de la Encarnación, Sevilla',
    sprite: 'plaza',
  },
  {
    id: 'seville-library-archivo-indias',
    type: 'library',
    position: { lat: 37.3837, lng: -5.9930 },
    address: 'Avenida de la Constitución, Sevilla',
    sprite: 'library',
  },
  {
    id: 'seville-library-universidad',
    type: 'library',
    position: { lat: 37.3810, lng: -5.9960 },
    address: 'Calle San Fernando, 4, Sevilla',
    sprite: 'library',
  },
  {
    id: 'seville-park-maria-luisa',
    type: 'park',
    position: { lat: 37.3760, lng: -5.9868 },
    address: 'Paseo de las Delicias, Sevilla',
    sprite: 'park',
  },
  {
    id: 'seville-park-alameda',
    type: 'park',
    position: { lat: 37.3967, lng: -5.9944 },
    address: 'Alameda de Hércules, Sevilla',
    sprite: 'park',
  },
  {
    id: 'seville-park-jardines-alcazar',
    type: 'park',
    position: { lat: 37.3834, lng: -5.9928 },
    address: 'Patio de Banderas, Sevilla',
    sprite: 'park',
  },
  {
    id: 'seville-market-triana',
    type: 'market',
    position: { lat: 37.3861, lng: -6.0017 },
    address: 'Plaza del Altozano, Triana, Sevilla',
    sprite: 'market',
  },
  {
    id: 'seville-market-arenal',
    type: 'market',
    position: { lat: 37.3880, lng: -5.9970 },
    address: 'Calle Pastor y Landero, Sevilla',
    sprite: 'market',
  },
  {
    id: 'seville-market-feria',
    type: 'market',
    position: { lat: 37.3988, lng: -5.9905 },
    address: 'Calle Feria, Sevilla',
    sprite: 'market',
  },
  {
    id: 'seville-church-catedral',
    type: 'church',
    position: { lat: 37.3858, lng: -5.9934 },
    address: 'Avenida de la Constitución, Sevilla',
    sprite: 'church',
  },
  {
    id: 'seville-church-salvador',
    type: 'church',
    position: { lat: 37.3908, lng: -5.9907 },
    address: 'Plaza del Salvador, Sevilla',
    sprite: 'church',
  },
  {
    id: 'seville-church-macarena',
    type: 'church',
    position: { lat: 37.4030, lng: -5.9900 },
    address: 'Calle Bécquer, 1, Sevilla',
    sprite: 'church',
  },
  {
    id: 'seville-monument-alcazar',
    type: 'monument',
    position: { lat: 37.3833, lng: -5.9906 },
    address: 'Patio de Banderas, Sevilla',
    sprite: 'monument',
  },
  {
    id: 'seville-monument-giralda',
    type: 'monument',
    position: { lat: 37.3859, lng: -5.9928 },
    address: 'Plaza Virgen de los Reyes, Sevilla',
    sprite: 'monument',
  },
  {
    id: 'seville-monument-torre-oro',
    type: 'monument',
    position: { lat: 37.3826, lng: -5.9965 },
    address: 'Paseo de Cristóbal Colón, Sevilla',
    sprite: 'monument',
  },
  {
    id: 'seville-monument-metropol-parasol',
    type: 'monument',
    position: { lat: 37.3935, lng: -5.9914 },
    address: 'Plaza de la Encarnación, Sevilla',
    sprite: 'monument',
  },
  {
    id: 'seville-monument-plaza-toros',
    type: 'monument',
    position: { lat: 37.3863, lng: -5.9993 },
    address: 'Paseo de Cristóbal Colón, 12, Sevilla',
    sprite: 'monument',
  },
  {
    id: 'seville-cafe-rinconcillo',
    type: 'cafe',
    position: { lat: 37.3958, lng: -5.9912 },
    address: 'Calle Gerona, 40, Sevilla',
    sprite: 'cafe',
  },
  {
    id: 'seville-cafe-la-campana',
    type: 'cafe',
    position: { lat: 37.3903, lng: -5.9946 },
    address: 'Calle Sierpes, 1, Sevilla',
    sprite: 'cafe',
  },
  {
    id: 'seville-cafe-casa-morales',
    type: 'cafe',
    position: { lat: 37.3880, lng: -5.9940 },
    address: 'Calle García de Vinuesa, 11, Sevilla',
    sprite: 'cafe',
  },
  {
    id: 'seville-office-cartuja',
    type: 'office',
    position: { lat: 37.3997, lng: -6.0058 },
    address: 'Isla de la Cartuja, Sevilla',
    sprite: 'office',
  },
  {
    id: 'seville-theatre-maestranza',
    type: 'theatre',
    position: { lat: 37.3845, lng: -5.9978 },
    address: 'Paseo de Cristóbal Colón, 22, Sevilla',
    sprite: 'theatre',
  },
  {
    id: 'seville-theatre-central',
    type: 'theatre',
    position: { lat: 37.3985, lng: -6.0045 },
    address: 'Isla de la Cartuja, Sevilla',
    sprite: 'theatre',
  },
  {
    id: 'seville-airport-svq',
    type: 'airport',
    position: { lat: 37.4180, lng: -5.8931 },
    address: 'Carretera de su Eminencia, Sevilla',
    sprite: 'airport',
  },
];

export const seville: City = {
  id: 'seville',
  country: 'Spain',
  position: { lat: 37.3886, lng: -5.9823 },
  locations,
};

export function getLocationById(id: string): LocationPOI | undefined {
  return locations.find((l) => l.id === id);
}

export function getLocationsByType(type: string): LocationPOI[] {
  return locations.filter((l) => l.type === type);
}

export function homeLocation(): LocationPOI {
  return HOME;
}
