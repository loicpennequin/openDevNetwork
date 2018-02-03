'use strict';
angular.module('pages')
.component('odnHome', {
    templateUrl : 'odnHome.component.html',
    controller : odnHomeController,
})
function odnHomeController($async, AuthService){
    let $ctrl = this;

    $ctrl.$onInit = function(){
        $ctrl.backgroundBlur = false;
        $ctrl.registrationSuccessful = false;
        $ctrl.registrationError = false;
    };

    $ctrl.register = $async(async(data) =>{
        try {
            let response = await AuthService.register(data);
            $ctrl.registrationSuccessful = true;
        }catch(error){
            console.log(error);
            $ctrl.registrationError = true;
        }
    });
};
