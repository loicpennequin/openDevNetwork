'use strict';
angular.module('core')
.factory('localStorage', ($window)=>{
    return {
        set: (key, value) => {
            $window.localStorage[key] = value;
        },
        setObject: (key, value) => {
            $window.localStorage[key] = JSON.stringify(value);
        },
        get: (key, defaultValue) => $window.localStorage[key] || defaultValue,
        getObject: key => JSON.parse($window.localStorage[key] || '{}'),
        delete : key => {
            delete $window.localStorage[key];
        }
    }
});
