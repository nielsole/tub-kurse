import UserDetailsController from './UserDetailsController'

export default {
  name : 'userDetails',
  config : {
    bindings         : {  selected: '<' },
    templateUrl      : 'src/courses/components/details/CourseDetails.html',
    controller       : [ '$mdBottomSheet', '$log', UserDetailsController ]
  }
};