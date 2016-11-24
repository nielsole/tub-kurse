// Load the custom app ES6 modules

import ElasticService from 'src/courses/services/ElasticService';

import FacetsList from 'src/courses/components/list/FacetsList';
import UserDetails from 'src/courses/components/details/UserDetails';

// Define the Angular 'users' module

export default angular
  .module("courses", ['ngMaterial'])

  .component(FacetsList.name, FacetsList.config)
  .component(UserDetails.name, UserDetails.config)

  .service("ElasticService", ElasticService);
