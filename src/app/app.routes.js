angular.module('app')
.config(function($stateProvider, $urlRouterProvider, $locationProvider){
    $urlRouterProvider.otherwise("/");
    $stateProvider
    .state('home', {
        url: "/",
        component: "odnHome"
    })
    .state('login', {
        url: "/login",
        component: "odnLogin",
        resolve : {
            // isLoggedin : (AuthService, localStorage, $state) => AuthService.isLoggedIn()
            //     .then( response =>{
            //         console.log(response);
            //         localStorage.set('authToken', response.data.token);
            //         $state.go('account.dashboard')
            //     })
        }
    })
    .state('account', {
        abstract: true,
        template: "<odn-main-navbar></odn-main-navbar><ui-view></ui-view>",
        resolve : {
            isLoggedin : (AuthService, localStorage, $state) => AuthService.isLoggedIn()
                .then( response =>{
                    localStorage.set('authToken', response.data.token);
                })
                .catch( (err) =>{
                    $state.go('login')
                })
        }
    })
    .state('account.dashboard', {
        url: "/dashboard",
        component: "odnDashboard"
    })

})
