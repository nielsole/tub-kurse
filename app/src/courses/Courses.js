// Load the custom app ES6 modules

import ElasticService from 'src/courses/services/ElasticService';

import FacetsList from 'src/courses/components/list/FacetsList';
import UserDetails from 'src/courses/components/details/UserDetails';
import HeaderController from 'src/courses/components/header/HeaderController';

// Define the Angular 'users' module

export default angular
.module("courses", ['ngMaterial'])

.component(FacetsList.name, FacetsList.config)
.component(UserDetails.name, UserDetails.config)
.controller('headerController', HeaderController)

.service("ElasticService", ElasticService);

