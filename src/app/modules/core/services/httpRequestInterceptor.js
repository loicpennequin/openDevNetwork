'use strict';
angular.module('core')
.factory('httpRequestInterceptor', (localStorage)=>{
    return {
        request: (config) =>{
            config.headers['Authorization'] = localStorage.get('authToken');
            return config;
        }
    }
});
