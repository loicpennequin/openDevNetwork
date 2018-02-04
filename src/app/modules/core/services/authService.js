'use strict';
angular.module('core')
.factory('AuthService', ($http, localStorage)=>{
    return {
        register : async (data)=> await $http.post("/api/users", data),
        login : async (data)=> await $http.post("/api/login", data),
        isLoggedIn : async ()=> await $http.get("/api/loggedin"),
        logout : () =>{
            localStorage.delete('authToken');
            localStorage.delete('uId');
        }
    }
});
