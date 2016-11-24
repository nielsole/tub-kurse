// Load the custom app ES6 modules

import ElasticService from 'src/courses/services/ElasticService';

import UsersList from 'src/courses/components/list/UsersList';
import UserDetails from 'src/courses/components/details/UserDetails';

// Define the Angular 'users' module

export default angular
  .module("courses", ['ngMaterial'])

  .component(UsersList.name, UsersList.config)
  .component(UserDetails.name, UserDetails.config)

  .service("ElasticService", ElasticService);
