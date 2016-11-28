class HeaderController  {

  /**
   * Constructor
   *
   * @param $mdBottomSheet
   * @param $log
   */
  constructor($scope) {
      this.$scope = $scope;
      this.toggleSearch = $scope.menuAction;
      //this.query = $scope.query;
      this.searchString = "";
    this.search = false;
  }
  /*toggleSearch(){
    this.search = !this.search;
    console.log(this.search);
  }*/
  query(searchString){
    console.log("Hello");
    this.$scope.queryAction(searchString);
  }

    toggleList(){
        console.log("ToggleIt!!!")
    }

}

export default HeaderController;

