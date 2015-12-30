'use strict';

angular.module('MTApp', [])
.controller('SearchController', function($scope, $http) {
  var pendingTask;

  if ($scope.search === undefined){
    $scope.search = "Test";
    fetch();
  }

  $scope.change = function(){
    if (pendingTask){
      clearTimeout(pendingTask);
    }
    pendingTask = setTimeout(fetch, 800);
  };

  function fetch(){
    $http.get('http://localhost/search?q=' + $scope.search)
     .then(function (result) {
        $scope.result = angular.fromJson(result.data).result;
      }, function (result) {
        $scope.result = "ERROR!!!";
      });

  $scope.select = function(){
      this.setSelectionRange(0, this.value.length);
    };
  }
})
