'use strict';
angular.module('core')
.factory('AuthService', ($http)=>{
    return {
        register : async (data)=> {
            return await $http.post("/api/users", data)
        }

    }
});
