angular
    .module('completeMe')
    .controller('LoginController', function($scope, $location, $window) {

        $scope.loginOauth = function(provider) {
            $window.location.href = '/auth/' + provider;
        };
    });
