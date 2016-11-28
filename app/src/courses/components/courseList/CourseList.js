import CourseListController from './CourseListController'

export default {
  name : 'userDetails',
  config : {
    bindings         : {  courses: '<' },
    templateUrl      : 'src/courses/components/courseList/CourseListItem.html',
    controller       : [ '$mdBottomSheet', '$log', '$scope', CourseListController ]
  }
};