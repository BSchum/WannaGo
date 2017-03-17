/**
 * Created by user on 14/03/2017.
 */

angular.module('app', [])
    .controller('RegisterController', function ($scope, $http) {
        $scope.hello = "Hello world";
        $scope.users = [];

        $scope.sayHello = function (name) {
           return "Hello " + name;
        }

        $scope.register = function () {
           /* Exercice 1
            $scope.users.push($scope.user);
            console.log($scope.user);
            $scope.user = null;
           */
            $http({
                method: 'POST',
                url: '/user/register',
                data: $scope.user
            }).then(function (response){
                $scope.user = {};
            });
        }

        $scope.refresh = function () {
            $http.get('/user/register/allUsers').then(function (response) {
                $scope.users = response.data;
            });
        }
    })