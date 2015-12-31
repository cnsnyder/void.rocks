'use strict';

angular.module('MTApp', [])
.controller('SubscribeController', function($scope, $http) {
  var pendingTask;

  if ($scope.email === undefined) {
    $scope.email = '';
  }
  $scope.change = function() {
    console.log('CHANGE');
    if ($scope.email == '') {
        document.getElementById("email").style.border = "solid 1px #40444D";
        document.getElementById("email").style.color = "#40444D";
    }
  }
  $scope.submit = function() {
    console.log('SUBMIT');

    if (pendingTask){
      clearTimeout(pendingTask);
    }
    pendingTask = setTimeout(subscribe, 800);
  }

  function subscribe(){
    console.log('TEST');
    if (!verifyEmail()){
      return;
    }
    $http.post('http://void.rocks/subscribe',
     angular.toJson({email_address: $scope.email}))
     .then(function (result) {
        $scope.result = angular.fromJson(result.data);
        console.log($scope.result);
      }, function (result) {
        $scope.result = "ERROR!!!";
      });
    };
    function verifyEmail(){
      var is_valid = false;
      var emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if ($scope.email.search(emailRegEx) == -1 && $scope.email != '') {
          document.getElementById("email").style.border = "solid 1px #D7244C";
          document.getElementById("email").style.color = "#D7244C";
      }
      else {
        document.getElementById("email").style.border = "solid 1px #40444D";
        document.getElementById("email").style.color = "#40444D";
        is_valid = true;
      }
      return is_valid;
    }

  $scope.select = function(){
      this.setSelectionRange(0, this.value.length);
    };
});
