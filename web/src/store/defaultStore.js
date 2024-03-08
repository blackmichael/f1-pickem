import {List} from 'immutable';

const driversList = List([
  'Max Verstappen',
  'Sergio Perez',
  'Lewis Hamilton',
  'George Russell',
  'Carlos Sainz',
  'Charles Leclerc',
  'Oliver Bearman',
  'Lando Norris',
  'Oscar Piastri',
  'Pierre Gasly',
  'Esteban Ocon',
  'Fernando Alonso',
  'Lance Stroll',
  'Valtteri Bottas',
  'Zhou Guanyu',
  'Kevin Magnussen',
  'Nico Hulkenberg',
  'Alexander Albon',
  'Logan Sargeant',
  'Yuki Tsunoda',
  'Liam Lawson',
  'Nyck De Vries',
  'Daniel Ricciardo',
  'Mick Schumacher',
  'Nicholas Latifi',
]);

export function getDrivers() {
  return driversList;
}
