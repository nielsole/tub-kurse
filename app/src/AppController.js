/**
 * Main App Controller for the Angular Material Starter App
 * @param ElasticService
 * @param $mdSidenav
 * @constructor
 */
function AppController(ElasticService, $mdSidenav) {
  var self = this;

  self.selected     = null;
  self.courses        = [ ];
  self.facets        = [ ];
  self.toggleList   = toggleUsersList;
  self.setFacetBucketFilter   = setFacetBucketFilter;
  self.filterSelectedFacets = isInSelectedFacets;
  self.query   = query;
  self.selectedFacets = {};
    //'Event.subType': ["hallo"]
  self.searchString = "";
  /*
  {
  "*facetName*": ["activeValue1", "activeValue2"]
  }
   */

  // Load all registered users

  ElasticService
        .loadQuery()
        .then( function( response ) {
          self.courses    = [].concat(response.data);
          self.facets    = [].concat(response.facets);
          console.log(self.facets);
        });

  // *********************************
  // Internal methods
  // *********************************

  /**
   * Hide or Show the 'left' sideNav area
   */
  function toggleUsersList() {
    $mdSidenav('left').toggle();
  }

  //Adds or removes a bucket from a facet
  function setFacetBucketFilter(facetName, bucketName, active){
    console.log(self.selectedFacets);
    var facet;
    if (self.selectedFacets.hasOwnProperty(facetName)){
      facet = self.selectedFacets[facetName];
    }else{
      facet = [];
      self.selectedFacets[facetName] = facet;
    }
    var ret = false;

    if (active){
      if (!(bucketName in facet)){
        facet.push({"name": bucketName, "count":0});
      }
    }else {
      if(bucketName in facet){
        facet.remove(bucketName);
      }
    }
    console.log(self.selectedFacets);
  }

  function isInSelectedFacets(bucketname){
    var ret = false;
    Object.values(self.selectedFacets).forEach(function(selectedFacet){
      if (selectedFacet.name == bucketname){
        ret = true;
      }
    });
    return ret;
  }

  function query(query) {
    console.log(self.selectedFacets);
    //var query = this.searchString;
    ElasticService.loadQuery(self.selectedFacets, query)
        .then(function(response){
      self.courses = [].concat(response.data);
      self.facets = [].concat(response.facets);
      // For each selected facet, add it to the current facet data
      Object.keys(self.selectedFacets).forEach((activeFacetName)=>{
        self.selectedFacets[activeFacetName].forEach((activeBucket)=>{
          self.facets.forEach((facetObject)=>{
            if (facetObject.name == activeFacetName){
              facetObject.buckets.forEach((newBucket)=>{
                if (newBucket.name == activeBucket){
                  newBucket.active=true;
                }
              });
            }
          });

        })
      });
    });
    console.log(self.facets)
  }

  /**
   * Select the current avatars
   * @param menuId
   */
  function selectUser ( user ) {
    self.selected = angular.isNumber(user) ? $scope.users[user] : user;
  }
}

export default [ 'ElasticService', '$mdSidenav', AppController ];
