module.exports.module = (moduleName) => {
    let content = `'use strict';
angular.module('${moduleName}', []);`;

    return content;
};

module.exports.componentHTML = (componentName) => {
    let content = `<div class="${componentName}-component">
    <p>{{$ctrl.name}} works!</p>
    </div>`;

    return content;
};

module.exports.componentJS = (moduleName, componentName) => {
    let content = `'use strict';
angular.module('${moduleName}')
.component('${componentName}', {
    templateUrl : '${componentName}.component.html',
    controller : ${componentName}Controller,
})
function ${componentName}Controller(){
    let $ctrl = this;
    $ctrl.$onInit = function(){
        $ctrl.name = "${componentName}";
    };
};`

    return content;
};

module.exports.factory = (moduleName, factoryName) => {
    let content = `'use strict';
angular.module('${moduleName}')
.factory('${factoryName}', ()=>{
    return {
    }
});
`;

    return content;
};

module.exports.controller = (dbName, tableName) => {
    let content = `<?php

    class ${tableName.substr(0, tableName.length-1)}Controller{
        //Properties
        private $${tableName};

        // Fetch All ${tableName}
        public function getAll(){
            $sql = "SELECT * FROM ${tableName}";

            $db = new db();
            $db = $db->connect();

            $stmt = $db->query($sql);

            $${tableName} = $stmt->fetchAll(PDO::FETCH_OBJ);
            $db = null;

            return $${tableName};
        }

        // Fetch a single ${tableName.substr(0, tableName.length-1)} by id
        public function getById($id){
            $sql = "SELECT * FROM ${tableName} WHERE id = $id LIMIT 1";

            $db = new db();
            $db = $db->connect();

            $stmt = $db->query($sql);

            $${tableName.substr(0, tableName.length-1)} = $stmt->fetch(PDO::FETCH_OBJ);
            $db = null;

            return $${tableName.substr(0, tableName.length-1)};
        }

        // Add a ${tableName.substr(0, tableName.length-1)}
        public function add($body){
            // We need to get the columns from the tableName
            $sql = "SELECT COLUMN_NAME
                FROM information_schema.COLUMNS
                WHERE TABLE_SCHEMA='${dbName}'
                AND TABLE_NAME='${tableName}'
                AND column_default is null;";

            $db = new db();
            $db = $db->connect();

            $stmt = $db->query($sql);
            $tableColumns = $stmt->fetchAll(PDO::FETCH_ASSOC);

            // Constructing the MySQL query
            $columns = "";
            $values = "";

            foreach($tableColumns as $key => $value){
                if ( (isset($body[$value['COLUMN_NAME']])) ) {
                    $columns = $columns . $value['COLUMN_NAME'] . ",";
                    $values = $values . ":" . $value['COLUMN_NAME'] . ",";
                }
            }

            $columns = substr($columns, 0, -1);
            $values = substr($values, 0, -1);

            $sql = "INSERT INTO ${tableName} (" . $columns . ") VALUES (" . $values . ")";

            //executing the query
            $stmt = $db->prepare($sql);

            foreach ($body as $key => $value) {
                $stmt->bindValue(':' . $key, $value);
            }

            $stmt->execute();

            $id = $db->lastInsertId();
            $db = null;

            return;
        }

        // Update a ${tableName.substr(0, tableName.length-1)}
        public function update($id, $body){
            // We need to get the columns from the tableName
            $sql = "SELECT COLUMN_NAME
                FROM information_schema.COLUMNS
                WHERE TABLE_SCHEMA='${dbName}'
                AND TABLE_NAME='${tableName}'
                AND column_default is null;";

            $db = new db();
            $db = $db->connect();

            $stmt = $db->query($sql);
            $tableColumns = $stmt->fetchAll(PDO::FETCH_ASSOC);

            // building the MySQL query
            $values = "";

            foreach($tableColumns as $key => $value){
                if ( (isset($body[$value['COLUMN_NAME']])) && $key != "id") {
                        $values = $values . $key . " = :" . $key . ",";
                }
            }

            $values = "";
            foreach ($body as $key => $value) {
                if ( $key != "id" ){
                    $values = $values . $key . " = :" . $key . ",";
                }
            }
            $values = substr($values, 0, -1);

            $sql = "UPDATE ${tableName} SET " . $values . " WHERE id = $id";

            //executing the query
            $stmt = $db->prepare($sql);

            foreach ($body as $key => $value) {
                if ( $key != "id" ){
                    $stmt->bindValue(':' . $key, $value);
                }
            }

            $stmt->execute();
            $db = null;

            return;
        }

        // Delete a ${tableName.substr(0, tableName.length-1)}
        public function remove($id){
            $sql = "DELETE FROM ${tableName} WHERE id = $id";

            $db = new db();
            $db = $db->connect();

            $stmt = $db->prepare($sql);
            $stmt->execute();
            $db = null;

            return;
        }
    }`;

    return content;
}

module.exports.routes = (tableName) => {
    let content = `<?php
        use \\Psr\\Http\\Message\\ServerRequestInterface as Request;
        use \\Psr\\Http\\Message\\ResponseInterface as Response;

        // Fetch all ${tableName}
        $app->get('/api/${tableName}', function(Request $request, Response $response){
            $ctrl = new ${tableName.substr(0, tableName.length-1)}Controller();

            echo $response->withJson($ctrl->getAll($request, $response), 200);
        });

        // Fetch a single ${tableName.substr(0, tableName.length-1)}
        $app->get('/api/${tableName}/{id}', function(Request $request, Response $response){
            $ctrl = new ${tableName.substr(0, tableName.length-1)}Controller();
            $id = $request->getAttribute('id');

            echo $response->withJson($ctrl->getById($id), 200);
        });

        // Add a ${tableName.substr(0, tableName.length-1)}
        $app->post('/api/${tableName}', function(Request $request, Response $response){
            $ctrl = new ${tableName.substr(0, tableName.length-1)}Controller();
            $body = $request->getParsedBody();

            echo $response->withJson($ctrl->add($body), 201);
        });

        // Update a ${tableName.substr(0, tableName.length-1)}
        $app->put('/api/${tableName}/{id}', function(Request $request, Response $response){
            $ctrl = new ${tableName.substr(0, tableName.length-1)}Controller();
            $id = $request->getAttribute('id');
            $body = $request->getParsedBody();

            echo $response->withJson($ctrl->update($id, $body), 201);
        });

        // Remove a ${tableName.substr(0, tableName.length-1)}
        $app->delete('/api/${tableName}/{id}', function(Request $request, Response $response){
            $ctrl = new ${tableName.substr(0, tableName.length-1)}Controller();

            $id = $request->getAttribute('id');

            echo $response->withJson($ctrl->remove($id), 202);
        });`;

        return content;
}
