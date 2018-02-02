'use strict';
angular.module('pages')
.component('odnDashboard', {
    templateUrl : 'odnDashboard.component.html',
    controller : odnDashboardController,
})
function odnDashboardController(){
    let $ctrl = this;
    $ctrl.$onInit = function(){
        $ctrl.name = "odnDashboard";
    };
};