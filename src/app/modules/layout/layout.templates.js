angular.module('layout').run(['$templateCache', function($templateCache) {
    $templateCache.put('odnMainNavbar.component.html',
        "<div class=\"odnMainNavbar-component\">\n    <button class=\"buton-clear\" ng-click=\"$ctrl.logout()\">Déconnection</button>\n</div>\n");
}]);