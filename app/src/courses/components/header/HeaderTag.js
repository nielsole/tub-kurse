import HeaderController from './HeaderController'

export default {
  name : 'headerBar',
  config : {
    bindings         : {  courses: '<', app: '<' },
    templateUrl      : 'src/courses/components/header/HeaderBar.html',
    controller       : [ '$scope', HeaderController ]
  }
};