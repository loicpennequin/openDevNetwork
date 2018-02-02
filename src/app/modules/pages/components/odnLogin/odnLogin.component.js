'use strict';
angular.module('pages')
.component('odnLogin', {
    templateUrl : 'odnLogin.component.html',
    controller : odnLoginController,
})
function odnLoginController(){
    let $ctrl = this;
    $ctrl.$onInit = function(){
        $ctrl.name = "odnLogin";
    };
};