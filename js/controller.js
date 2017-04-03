var app = angular.module("myApp", []);

app.controller('controller', ['$scope', '$http', '$window', '$filter', function($scope, $http, $window, $filter) {  
    $scope.submit = function() {
    $scope.contact.date = $filter("date")(Date.now(), 'MM/dd/yyyy HH:mma');
    $http.post('/crud/submitted', $scope.contact).success(function(response) {
        $scope.contact = "";
    });
  };

  var refreshSubmissions = function() {
    $http.get('/crud/submitted').success(function(response) {
        $scope.submissions = response;
    });
  };
 
  refreshSubmissions();

  $scope.removeSub = function(id) {
    $http.delete('/crud/submitted/' + id).success(function(response) {
    });
    refreshSubmissions();
  };
 
  var refreshProject = function() {
    $http.get('/crud/prjs').success(function(response) {
        $scope.prjs = response;
        $scope.proj  = "";
    });
  };

  refreshProject(); 

  $scope.addProject = function() {
   $http.post('/crud/prjs', $scope.proj).success(function(response) {
      $scope.proj = "";
    });
    refreshProject();
  };

  $scope.removeProject = function(id) {
    $http.delete('/crud/prjs/' + id).success(function(response) {
    });
    refreshProject();
  };

  $scope.editProject = function(id) {
    $http.get('/crud/prjs/' + id).success(function(response) {
      $scope.proj = response;
    });
  };
  $scope.updateProject = function() {
    $http.put('/crud/prjs/' + $scope.proj._id, $scope.proj).success(function(response) { 
        refreshProject();
    });
  };

  $scope.login = function() {
    $http.post('/admin/login?user=' + $scope.user +'&pass=' + $scope.pass).success(function(response) {
        console.log(response);
        if(response != 'correct') {
            $scope.response = response;
        }
        else {
            $window.location = '/admin/access';
        }
    });
  };

    $scope.logout = function() {
        console.log("logged out");
        $http.get('/admin/logout').success(function(response) {
            console.log("logged out");
            $window.location = '/';
        });
    };
}]);
