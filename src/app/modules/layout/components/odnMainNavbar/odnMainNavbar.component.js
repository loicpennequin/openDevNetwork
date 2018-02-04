'use strict';
angular.module('layout')
.component('odnMainNavbar', {
    templateUrl : 'odnMainNavbar.component.html',
    controller : odnMainNavbarController,
})
function odnMainNavbarController($async, AuthService, localStorage, $state){
    let $ctrl = this;

    $ctrl.logout = () =>{
        AuthService.logout();
        $state.go('login');
    };
};
