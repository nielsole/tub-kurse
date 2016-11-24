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

  // Load all registered users

  ElasticService
        .loadAllUsers()
        .then( function( response ) {
          self.courses    = [].concat(response.data);
          self.facets    = [].concat(response.facets);
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

  /**
   * Select the current avatars
   * @param menuId
   */
  function selectUser ( user ) {
    self.selected = angular.isNumber(user) ? $scope.users[user] : user;
  }
}

export default [ 'ElasticService', '$mdSidenav', AppController ];