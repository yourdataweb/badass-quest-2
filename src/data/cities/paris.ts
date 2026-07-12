import type { City, LocationPOI } from '../../store/types';

const HOME: LocationPOI = {
  id: 'paris-home',
  type: 'home',
  position: { lat: 48.8570, lng: 2.3540 },
  address: 'Rue des Rosiers, Le Marais, Paris',
  sprite: 'home',
};

const locations: LocationPOI[] = [
  HOME,
  {
    id: 'paris-plaza-republique',
    type: 'plaza',
    position: { lat: 48.8674, lng: 2.3634 },
    address: 'Place de la République, Paris',
    sprite: 'plaza',
  },
  {
    id: 'paris-plaza-vosges',
    type: 'plaza',
    position: { lat: 48.8554, lng: 2.3625 },
    address: 'Place des Vosges, Paris',
    sprite: 'plaza',
  },
  {
    id: 'paris-plaza-bastille',
    type: 'plaza',
    position: { lat: 48.8533, lng: 2.3692 },
    address: 'Place de la Bastille, Paris',
    sprite: 'plaza',
  },
  {
    id: 'paris-plaza-pigalle',
    type: 'plaza',
    position: { lat: 48.8823, lng: 2.3375 },
    address: 'Place Pigalle, Paris 18e',
    sprite: 'plaza',
  },
  {
    id: 'paris-library-bnf-richelieu',
    type: 'library',
    position: { lat: 48.8654, lng: 2.3408 },
    address: 'Rue de Richelieu, 58, Paris 2e',
    sprite: 'library',
  },
  {
    id: 'paris-library-shakespeare',
    type: 'library',
    position: { lat: 48.8527, lng: 2.3469 },
    address: '37 Rue de la Bûcherie, Paris 5e',
    sprite: 'library',
  },
  {
    id: 'paris-library-forney',
    type: 'library',
    position: { lat: 48.8525, lng: 2.3534 },
    address: 'Hôtel de Sens, 1 Rue du Figuier, Paris 4e',
    sprite: 'library',
  },
  {
    id: 'paris-park-luxembourg',
    type: 'park',
    position: { lat: 48.8462, lng: 2.3372 },
    address: 'Boulevard Saint-Michel, Paris 6e',
    sprite: 'park',
  },
  {
    id: 'paris-park-tuileries',
    type: 'park',
    position: { lat: 48.8638, lng: 2.3284 },
    address: 'Rue de Rivoli, Paris 1er',
    sprite: 'park',
  },
  {
    id: 'paris-park-buttes-chaumont',
    type: 'park',
    position: { lat: 48.8788, lng: 2.3824 },
    address: 'Rue Manin, Paris 19e',
    sprite: 'park',
  },
  {
    id: 'paris-park-bois-boulogne',
    type: 'park',
    position: { lat: 48.8635, lng: 2.2466 },
    address: 'Bois de Boulogne, Paris 16e',
    sprite: 'park',
  },
  {
    id: 'paris-market-aligre',
    type: 'market',
    position: { lat: 48.8495, lng: 2.3742 },
    address: 'Place d\'Aligre, Paris 12e',
    sprite: 'market',
  },
  {
    id: 'paris-market-enfants-rouges',
    type: 'market',
    position: { lat: 48.8621, lng: 2.3601 },
    address: '39 Rue de Bretagne, Paris 3e',
    sprite: 'market',
  },
  {
    id: 'paris-market-bastille',
    type: 'market',
    position: { lat: 48.8521, lng: 2.3710 },
    address: 'Boulevard Richard-Lenoir, Paris 11e',
    sprite: 'market',
  },
  {
    id: 'paris-church-notre-dame',
    type: 'church',
    position: { lat: 48.8530, lng: 2.3499 },
    address: 'Parvis Notre-Dame, Île de la Cité, Paris',
    sprite: 'church',
  },
  {
    id: 'paris-church-sacre-coeur',
    type: 'church',
    position: { lat: 48.8867, lng: 2.3431 },
    address: 'Parvis du Sacré-Cœur, Montmartre, Paris 18e',
    sprite: 'church',
  },
  {
    id: 'paris-church-sainte-chapelle',
    type: 'church',
    position: { lat: 48.8555, lng: 2.3450 },
    address: 'Île de la Cité, Paris 1er',
    sprite: 'church',
  },
  {
    id: 'paris-monument-eiffel',
    type: 'monument',
    position: { lat: 48.8584, lng: 2.2945 },
    address: 'Champ de Mars, Paris 7e',
    sprite: 'monument',
  },
  {
    id: 'paris-monument-arc-triomphe',
    type: 'monument',
    position: { lat: 48.8738, lng: 2.2950 },
    address: 'Place Charles de Gaulle, Paris 8e',
    sprite: 'monument',
  },
  {
    id: 'paris-monument-louvre',
    type: 'monument',
    position: { lat: 48.8606, lng: 2.3376 },
    address: 'Rue de Rivoli, Paris 1er',
    sprite: 'monument',
  },
  {
    id: 'paris-monument-pompidou',
    type: 'monument',
    position: { lat: 48.8606, lng: 2.3522 },
    address: 'Place Georges-Pompidou, Paris 4e',
    sprite: 'monument',
  },
  {
    id: 'paris-monument-moulin-rouge',
    type: 'monument',
    position: { lat: 48.8842, lng: 2.3323 },
    address: '82 Boulevard de Clichy, Paris 18e',
    sprite: 'monument',
  },
  {
    id: 'paris-monument-pont-neuf',
    type: 'monument',
    position: { lat: 48.8573, lng: 2.3413 },
    address: 'Pont Neuf, Paris 1er',
    sprite: 'monument',
  },
  {
    id: 'paris-cafe-flore',
    type: 'cafe',
    position: { lat: 48.8541, lng: 2.3334 },
    address: '172 Boulevard Saint-Germain, Paris 6e',
    sprite: 'cafe',
  },
  {
    id: 'paris-cafe-deux-magots',
    type: 'cafe',
    position: { lat: 48.8537, lng: 2.3331 },
    address: '6 Place Saint-Germain-des-Prés, Paris 6e',
    sprite: 'cafe',
  },
  {
    id: 'paris-cafe-procope',
    type: 'cafe',
    position: { lat: 48.8528, lng: 2.3379 },
    address: '13 Rue de l\'Ancienne-Comédie, Paris 6e',
    sprite: 'cafe',
  },
  {
    id: 'paris-office-defense',
    type: 'office',
    position: { lat: 48.8920, lng: 2.2368 },
    address: 'Esplanade de la Défense, Puteaux',
    sprite: 'office',
  },
  {
    id: 'paris-theatre-garnier',
    type: 'theatre',
    position: { lat: 48.8719, lng: 2.3316 },
    address: 'Place de l\'Opéra, Paris 9e',
    sprite: 'theatre',
  },
  {
    id: 'paris-theatre-chatelet',
    type: 'theatre',
    position: { lat: 48.8584, lng: 2.3475 },
    address: '2 Rue Edouard Colonne, Paris 1er',
    sprite: 'theatre',
  },
  {
    id: 'paris-airport-cdg',
    type: 'airport',
    position: { lat: 49.0097, lng: 2.5478 },
    address: 'Route de l\'Aéroport, Roissy-en-France',
    sprite: 'airport',
  },
];

export const paris: City = {
  id: 'paris',
  country: 'France',
  position: { lat: 48.8566, lng: 2.3522 },
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
