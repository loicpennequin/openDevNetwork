angular.module('pages').run(['$templateCache', function($templateCache) {
    $templateCache.put('odnLogin.component.html',
        "<div class=\"odnLogin-component\">\n    <p>{{$ctrl.name}} works!</p>\n    </div>");
}]);
angular.module('pages').run(['$templateCache', function($templateCache) {
    $templateCache.put('odnDashboard.component.html',
        "<div class=\"odnDashboard-component\">\n    <p>{{$ctrl.name}} works!</p>\n    </div>");
}]);
angular.module('pages').run(['$templateCache', function($templateCache) {
    $templateCache.put('odnHome.component.html',
        "<div class=\"odnHome-component\">\n    <header>\n        <section>\n            <div class=\"header-content\">\n                <h1>Open Dev Network</h1>\n                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>\n            </div>\n        </section>\n        <section>\n            <div class=\"header-content\">\n                <odn-register-form></odn-register-form>\n                <span>Déjà inscrit ?</span>\n                <button class=\"button-clear\">Connectez-vous</button>\n            </div>\n        </section>\n    </header>\n</div>\n");
}]);
angular.module('pages').run(['$templateCache', function($templateCache) {
    $templateCache.put('odnRegisterForm.component.html',
        "<div class=\"odnLoginForm-component\">\n    <h2>Rejoignez nous dès maintenant</h2>\n    <form>\n        <div class=\"form-field\">\n            <label>Pseudo</label>\n            <input class=\"large\" type=\"text\">\n        </div>\n\n        <div class=\"form-field\">\n            <label>Mot de passe</label>\n            <input class=\"large\" type=\"password\">\n        </div>\n\n        <div class=\"form-field\">\n            <label>Confirmez votre mot de passe</label>\n            <input class=\"large\" type=\"password\">\n        </div>\n\n        <div class=\"form-field\">\n            <label>Email</label>\n            <input class=\"large\" type=\"email\">\n        </div>\n\n        <div class=\"form-field\">\n            <input type=\"submit\" class=\"large\" value=\"S'inscrire\">\n        </div>\n    </form>\n</div>\n");
}]);