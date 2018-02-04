'use strict';
angular.module('pages')
.component('odnLogin', {
    templateUrl : 'odnLogin.component.html',
    controller : odnLoginController,
})
function odnLoginController($async, AuthService, localStorage, $state){
    let $ctrl = this;

    $ctrl.login = $async( async credentials =>{
        credentials.remember == true ? localStorage.setObject('cachedCredentials', credentials) : localStorage.delete('cachedCredentials');

        try{
            let userData = (await AuthService.login(credentials)).data;
            localStorage.set('authToken', userData.token);
            localStorage.set('uId', userData.user.id);
            $state.go('account.dashboard');
        }catch(err){
            console.log(err);
        }
    });
};
