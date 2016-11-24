/**
 * Main App Controller for the Angular Material Starter App
 * @param ElasticService
 * @param $mdSidenav
 * @constructor
 */
function AppController(ElasticService, $mdSidenav) {
  var self = this;

  self.selected     = null;
  self.users        = [ ];
  self.selectUser   = selectUser;
  self.toggleList   = toggleUsersList;

  // Load all registered users

  ElasticService
        .loadAllUsers()
        .then( function( users ) {
          self.users    = [].concat(users);
          console.log(users);
          self.selected = self.users[0];
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
