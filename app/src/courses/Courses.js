// Load the custom app ES6 modules

import ElasticService from 'src/courses/services/ElasticService';

import FacetsList from 'src/courses/components/facetList/FacetsList';
import CourseList from 'src/courses/components/courseList/CourseList';
import HeaderController from 'src/courses/components/header/HeaderController';

// Define the Angular 'users' module

export default angular
.module("courses", ['ngMaterial'])

.component(FacetsList.name, FacetsList.config)
.component(CourseList.name, CourseList.config)
.controller('headerController', HeaderController)

.service("ElasticService", ElasticService);

