'use strict';
angular.module('pages')
.component('odnLoginForm', {
    templateUrl : 'odnLoginForm.component.html',
    controller : odnLoginFormController,
})
function odnLoginFormController(){
    let $ctrl = this;
    $ctrl.$onInit = function(){
        $ctrl.name = "odnLoginForm";
    };
};