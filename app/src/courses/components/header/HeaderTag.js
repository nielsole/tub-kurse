import HeaderController from './HeaderController'

export default {
  name : 'headerBar',
  config : {
    bindings         : {  menuAction: '&', queryAction: '&' },
    templateUrl      : 'src/courses/components/header/HeaderBar.html',
    controller       : [ '$scope', HeaderController ],
    bindToController : true,
    controllerAs     : '$ctrl'
  }
};