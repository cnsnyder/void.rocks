'use strict';

angular.module('MTApp', [])
.controller('SubscribeController', function($scope, $http) {
  var pendingTask;

  if ($scope.email === undefined) {
    $scope.email = '';
  }
  $scope.change = function() {
    console.log('CHANGE')
    if (pendingTask){
      clearTimeout(pendingTask);
    }
    pendingTask = setTimeout(subscribe, 800);
  }

  function subscribe(){
    console.log('TEST');
    $http.post('http://localhost/subscribe',
     angular.toJson({email_address: $scope.email}))
     .then(function (result) {
        console.log('A');
        $scope.result = angular.fromJson(result.data).email;
        console.log($scope.result);
      }, function (result) {
        console.log('B');
        $scope.result = "ERROR!!!";
      });
    };

  $scope.select = function(){
      console.log('SELECT!!!');
      this.setSelectionRange(0, this.value.length);
    };
});
