// Notice that we do not have a controller since this component does not
// have any specialized logic.

export default {
  name : 'facetsList',
  config : {
    bindings         : {  facets: '<', selected : '<', showDetails : '&onSelected' },
    templateUrl      : 'src/courses/components/facetList/FacetsList.html'
  }
};
