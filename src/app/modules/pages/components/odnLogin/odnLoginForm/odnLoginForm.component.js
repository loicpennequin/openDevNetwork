'use strict';
angular.module('pages')
.component('odnLoginForm', {
    bindings: {
        onSubmit: "&"
    },
    templateUrl : 'odnLoginForm.component.html',
    controller : odnLoginFormController,
})
function odnLoginFormController(localStorage){
    let $ctrl = this;
    $ctrl.$onInit = function(){
        $ctrl.credentials = localStorage.getObject('cachedCredentials');
    };
};
