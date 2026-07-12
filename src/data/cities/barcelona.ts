import type { City, LocationPOI } from '../../store/types';

const HOME: LocationPOI = {
  id: 'bcn-home',
  type: 'home',
  position: { lat: 41.4020, lng: 2.1570 },
  address: 'Carrer de Verdi, Gràcia, Barcelona',
  sprite: 'home',
};

const locations: LocationPOI[] = [
  HOME,
  {
    id: 'bcn-plaza-catalunya',
    type: 'plaza',
    position: { lat: 41.3870, lng: 2.1700 },
    address: 'Plaça de Catalunya, Barcelona',
    sprite: 'plaza',
  },
  {
    id: 'bcn-plaza-real',
    type: 'plaza',
    position: { lat: 41.3800, lng: 2.1750 },
    address: 'Plaza Reial, Barcelona',
    sprite: 'plaza',
  },
  {
    id: 'bcn-plaza-espanya',
    type: 'plaza',
    position: { lat: 41.3750, lng: 2.1490 },
    address: 'Plaça d\'Espanya, Barcelona',
    sprite: 'plaza',
  },
  {
    id: 'bcn-library-central',
    type: 'library',
    position: { lat: 41.3805, lng: 2.1685 },
    address: 'Carrer d\'Elisabets, 6, Barcelona',
    sprite: 'library',
  },
  {
    id: 'bcn-library-catalunya',
    type: 'library',
    position: { lat: 41.3850, lng: 2.1690 },
    address: 'Carrer de l\'Hospital, 56, Barcelona',
    sprite: 'library',
  },
  {
    id: 'bcn-park-ciutadella',
    type: 'park',
    position: { lat: 41.3880, lng: 2.1850 },
    address: 'Passeig de Picasso, Barcelona',
    sprite: 'park',
  },
  {
    id: 'bcn-park-guell',
    type: 'park',
    position: { lat: 41.4145, lng: 2.1527 },
    address: 'Carrer d\'Olot, Barcelona',
    sprite: 'park',
  },
  {
    id: 'bcn-park-montjuic',
    type: 'park',
    position: { lat: 41.3640, lng: 2.1660 },
    address: 'Montjuïc, Barcelona',
    sprite: 'park',
  },
  {
    id: 'bcn-market-boqueria',
    type: 'market',
    position: { lat: 41.3815, lng: 2.1715 },
    address: 'La Rambla, 91, Barcelona',
    sprite: 'market',
  },
  {
    id: 'bcn-market-sant-antoni',
    type: 'market',
    position: { lat: 41.3780, lng: 2.1620 },
    address: 'Carrer del Comte d\'Urgell, 1, Barcelona',
    sprite: 'market',
  },
  {
    id: 'bcn-church-santa-maria',
    type: 'church',
    position: { lat: 41.3835, lng: 2.1820 },
    address: 'Plaça de Santa Maria, 1, Barcelona',
    sprite: 'church',
  },
  {
    id: 'bcn-church-sagrada',
    type: 'church',
    position: { lat: 41.4036, lng: 2.1744 },
    address: 'Carrer de Mallorca, 401, Barcelona',
    sprite: 'church',
  },
  {
    id: 'bcn-monument-casa-batllo',
    type: 'monument',
    position: { lat: 41.3916, lng: 2.1650 },
    address: 'Passeig de Gràcia, 43, Barcelona',
    sprite: 'monument',
  },
  {
    id: 'bcn-monument-pedrera',
    type: 'monument',
    position: { lat: 41.3950, lng: 2.1610 },
    address: 'Passeig de Gràcia, 92, Barcelona',
    sprite: 'monument',
  },
  {
    id: 'bcn-monument-arc-triomf',
    type: 'monument',
    position: { lat: 41.3910, lng: 2.1805 },
    address: 'Passeig de Lluís Companys, Barcelona',
    sprite: 'monument',
  },
  {
    id: 'bcn-cafe-federal',
    type: 'cafe',
    position: { lat: 41.3820, lng: 2.1700 },
    address: 'Carrer del Parlament, 39, Barcelona',
    sprite: 'cafe',
  },
  {
    id: 'bcn-cafe-satan',
    type: 'cafe',
    position: { lat: 41.3840, lng: 2.1720 },
    address: 'Carrer de l\'Arc de Sant Agustí, 1, Barcelona',
    sprite: 'cafe',
  },
  {
    id: 'bcn-cafe-nomad',
    type: 'cafe',
    position: { lat: 41.3855, lng: 2.1695 },
    address: 'Passatge de Sert, 12, Barcelona',
    sprite: 'cafe',
  },
  {
    id: 'bcn-office-22',
    type: 'office',
    position: { lat: 41.3980, lng: 2.1920 },
    address: 'Carrer de la Llacuna, Barcelona',
    sprite: 'office',
  },
  {
    id: 'bcn-theatre-lliure',
    type: 'theatre',
    position: { lat: 41.3710, lng: 2.1590 },
    address: 'Plaça Margarida Xirgu, 1, Barcelona',
    sprite: 'theatre',
  },

  // ── Additional locations ──

  {
    id: 'bcn-plaza-sant-jaume',
    type: 'plaza',
    position: { lat: 41.3826, lng: 2.1768 },
    address: 'Plaça de Sant Jaume, Barcelona',
    sprite: 'plaza',
  },
  {
    id: 'bcn-plaza-gracia',
    type: 'plaza',
    position: { lat: 41.4024, lng: 2.1569 },
    address: 'Plaça de la Vila de Gràcia, Barcelona',
    sprite: 'plaza',
  },
  {
    id: 'bcn-plaza-lesseps',
    type: 'plaza',
    position: { lat: 41.4099, lng: 2.1503 },
    address: 'Plaça de Lesseps, Barcelona',
    sprite: 'plaza',
  },
  {
    id: 'bcn-library-born',
    type: 'library',
    position: { lat: 41.3855, lng: 2.1832 },
    address: 'Carrer del Comerç, 1, Barcelona',
    sprite: 'library',
  },
  {
    id: 'bcn-park-laberint',
    type: 'park',
    position: { lat: 41.4327, lng: 2.1423 },
    address: 'Passeig dels Castanyers, 1, Barcelona',
    sprite: 'park',
  },
  {
    id: 'bcn-park-diagonal-mar',
    type: 'park',
    position: { lat: 41.4097, lng: 2.2176 },
    address: 'Carrer de Llull, 362, Barcelona',
    sprite: 'park',
  },
  {
    id: 'bcn-market-santa-caterina',
    type: 'market',
    position: { lat: 41.3851, lng: 2.1778 },
    address: 'Avinguda de Francesc Cambó, 16, Barcelona',
    sprite: 'market',
  },
  {
    id: 'bcn-market-galvany',
    type: 'market',
    position: { lat: 41.3930, lng: 2.1521 },
    address: 'Carrer de Muntaner, 109, Barcelona',
    sprite: 'market',
  },
  {
    id: 'bcn-church-pi',
    type: 'church',
    position: { lat: 41.3818, lng: 2.1738 },
    address: 'Plaça del Pi, 7, Barcelona',
    sprite: 'church',
  },
  {
    id: 'bcn-monument-palau-musica',
    type: 'monument',
    position: { lat: 41.3876, lng: 2.1752 },
    address: 'Carrer del Palau de la Música, 4–6, Barcelona',
    sprite: 'monument',
  },
  {
    id: 'bcn-monument-colom',
    type: 'monument',
    position: { lat: 41.3766, lng: 2.1782 },
    address: 'Plaça del Portal de la Pau, Barcelona',
    sprite: 'monument',
  },
  {
    id: 'bcn-monument-palau-nacional',
    type: 'monument',
    position: { lat: 41.3683, lng: 2.1534 },
    address: 'Parc de Montjuïc, Barcelona',
    sprite: 'monument',
  },
  {
    id: 'bcn-monument-tibidabo',
    type: 'monument',
    position: { lat: 41.4219, lng: 2.1188 },
    address: 'Plaça del Tibidabo, Barcelona',
    sprite: 'monument',
  },
  {
    id: 'bcn-monument-barceloneta',
    type: 'monument',
    position: { lat: 41.3777, lng: 2.1924 },
    address: 'Passeig Marítim de la Barceloneta, Barcelona',
    sprite: 'monument',
  },
  {
    id: 'bcn-cafe-el-nacional',
    type: 'cafe',
    position: { lat: 41.3922, lng: 2.1640 },
    address: 'Passeig de Gràcia, 24 bis, Barcelona',
    sprite: 'cafe',
  },
  {
    id: 'bcn-cafe-bar-marsella',
    type: 'cafe',
    position: { lat: 41.3800, lng: 2.1729 },
    address: 'Carrer de Sant Pau, 65, Barcelona',
    sprite: 'cafe',
  },
  {
    id: 'bcn-office-poblenou',
    type: 'office',
    position: { lat: 41.4006, lng: 2.1978 },
    address: 'Rambla del Poblenou, Barcelona',
    sprite: 'office',
  },
  {
    id: 'bcn-theatre-liceu',
    type: 'theatre',
    position: { lat: 41.3802, lng: 2.1727 },
    address: 'La Rambla, 51–59, Barcelona',
    sprite: 'theatre',
  },
  {
    id: 'bcn-theatre-nacional',
    type: 'theatre',
    position: { lat: 41.4050, lng: 2.1903 },
    address: 'Plaça de les Arts, 1, Barcelona',
    sprite: 'theatre',
  },
  {
    id: 'bcn-airport',
    type: 'airport',
    position: { lat: 41.2971, lng: 2.0785 },
    address: 'El Prat de Llobregat, Barcelona',
    sprite: 'airport',
  },
];

export const barcelona: City = {
  id: 'barcelona',
  country: 'Spain',
  position: { lat: 41.3874, lng: 2.1686 },
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