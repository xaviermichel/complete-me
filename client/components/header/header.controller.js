'use strict';

angular.module('completeMe')
    .controller('HeaderController', function($scope, $timeout, $mdSidenav, $mdUtil, $log, $location, Auth) {
        $scope.toggleLeftBar = buildToggler('left');
        $scope.isLoggedIn = Auth.isLoggedIn;
        $scope.isAdmin = Auth.isAdmin;
        $scope.getCurrentUser = Auth.getCurrentUser;

        $scope.logout = function() {
            Auth.logout();
            $location.path('/login');
        };

        $scope.isActive = function(route) {
            return route === $location.path();
        };

        function buildToggler(navID) {
            var debounceFn = $mdUtil.debounce(function() {
                $mdSidenav(navID).toggle();
            }, 300);
            return debounceFn;
        }
    });
