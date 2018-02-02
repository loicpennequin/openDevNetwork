'use strict';
angular.module('pages')
.component('odnHome', {
    templateUrl : 'odnHome.component.html',
    controller : odnHomeController,
})
function odnHomeController(){
    let $ctrl = this;
    $ctrl.$onInit = function(){
        $ctrl.name = "odnHome";
    };
};