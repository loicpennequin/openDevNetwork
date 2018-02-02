angular.module('app')
.config(function($stateProvider, $urlRouterProvider, $locationProvider){
    $urlRouterProvider.otherwise("/");
    $stateProvider
    .state('home', {
        url: "/",
        component: "odnHome",
        resolve : {
            // isLoggedin : (AuthService, $state) => AuthService.isLoggedin()
            //     .then( response => response.data == true ? $state.go('home') : response.data )
        }
    })
    .state('login', {
        url: "/login",
        component: "odnLogin",
        resolve : {
            // isLoggedin : (AuthService, $state) => AuthService.isLoggedin()
            //     .then( response => response.data == true ? $state.go('home') : response.data )
        }
    })
    .state('account', {
        abstract: true,
        component: "odnHome",
        resolve : {
            isLoggedin : (AuthService, $state) => AuthService.isLoggedin()
                .then( response => response.data == true ? $state.go('home') : response.data )
        }
    })
    .state('account.dashBoard', {
        url: "/dashboard",
        component: "odnDashboard",
        resolve : {
            // isLoggedin : (AuthService, $state) => AuthService.isLoggedin()
            //     .then( response => response.data == true ? $state.go('home') : response.data )
        }
    })

})
