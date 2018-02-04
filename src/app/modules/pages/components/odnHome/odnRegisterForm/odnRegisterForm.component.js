'use strict';
angular.module('pages')
.component('odnRegisterForm', {
    bindings: {
        onFocus: "&",
        onBlur: "&",
        onSubmit: "&"
    },
    templateUrl : 'odnRegisterForm.component.html',
    controller : odnRegisterFormController,
})
function odnRegisterFormController(){
    let $ctrl = this;

    $ctrl.emailRegex = new RegExp(/^[_a-z0-9]+(\.[_a-z0-9]+)*@@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/);
};

angular.module('pages')
.directive('passwordMatch', () => {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function(value) {
                let matchElement = attrs.passwordMatch;

                if (!value || value.length == 0) return;
                ngModel.$setValidity('match', value === matchElement);
                return value;
            })
        }
    }
})
.directive('isAvailable', ($http) => {
    return {
        require: 'ngModel',
        link: (scope, element, attrs, ngModel) => {
            let apiUrl = attrs.isAvailable;

            let _setAsAvailable = (bool) =>{ngModel.$setValidity('available', bool)};

            let _checkAvailable = (value) => {
                if (!value || value.length == 0) return;

                $http.post(apiUrl, {value: value})
                    .then((response) =>{
                        _setAsAvailable(response.data.available);
                    })
                    .catch((err) => {
                        _setAsAvailable(false);
                    });

                return value;
            };

            let _debounceCheckAvailable = _.debounce(_checkAvailable, 1000);

            ngModel.$parsers.push(_debounceCheckAvailable);
        }
    }
});
