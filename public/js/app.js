'use strict';

angular.module('MTApp', ["ngAnimate"])
.controller('SubscribeController', function($scope, $http) {
  var pendingTask;
  var result_label = angular.element(document.querySelector("#result_label"));
  $scope.displayResult = false;
  if ($scope.email === undefined) {
    $scope.email = '';
  }
  if ($scope.result === undefined) {
    $scope.result = '';
  }
  $scope.change = function() {
    console.log('CHANGE');
    $scope.displayResult = false;
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
    if (!verifyEmail($scope)){
      console.log('NOPE!!');
      // do something with the result label
      return;
    }
    $http.post('http://void.rocks/subscribe',
     angular.toJson({email_address: $scope.email}))
     .then(function (result) {
        result = angular.fromJson(result.data);
        $scope.result = result.displayMessage;
        $scope.success = result.success;
        $scope.displayResult = true;
        console.log($scope.result);
        console.log($scope.success);
      }, function (result) {
        $scope.result = "ERROR!!!";
      });
    };
    function verifyEmail($scope){
      var is_valid = false;
      var emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if ($scope.email.search(emailRegEx) == -1 && $scope.email != '') {
        console.log('INVALID EMAIL');
          document.getElementById("email").style.border = "solid 1px #D7244C";
          document.getElementById("email").style.color = "#D7244C";
          $scope.result = "Please enter a vaild email address";
      }
      else if ($scope.email == '') {
        $scope.result = "Please enter an email address";
      } else {
        document.getElementById("email").style.border = "solid 1px #40444D";
        document.getElementById("email").style.color = "#40444D";
        is_valid = true;
      }
      return is_valid;
    }

  $scope.select = function(){
      this.setSelectionRange(0, this.value.length);
      console.log("SELECT");
    };
});
