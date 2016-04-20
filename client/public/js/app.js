angular.module('nodeTodo', [])

.controller('mainController', function($scope, $http) {

    $scope.aluno = {};
    $scope.alunos = [];

    $http.get('/api/v1/aluno')
        .success(function(data) {
            $scope.alunos = data;
            console.log(data);
        })
        .error(function(error) {
            console.log('Error: ' + error);
        });

    $scope.salvarAluno = function() {
        if($scope.aluno.id){
            $http.put('/api/v1/aluno/' + $scope.aluno.id, $scope.aluno)
                .success(function (data) {
                    $scope.aluno = {};
                    $scope.alunos = data;
                    console.log(data);
                })
                .error(function (error) {
                    console.log('Error: ' + error);
                });
        } else {
            $http.post('/api/v1/aluno', $scope.aluno)
                .success(function (data) {
                    $scope.aluno = {};
                    $scope.alunos = data;
                    console.log(data);
                })
                .error(function (error) {
                    console.log('Error: ' + error);
                });
        }
    };

    $scope.removerAluno = function(alunoId) {
        $http.delete('/api/v1/aluno/' + alunoId)
            .success(function(data) {
                $scope.alunos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    
    $scope.selecionarAluno = function(aluno){
        $scope.aluno = aluno;
    };

    $scope.limpar = function () {
        $scope.aluno = {};
    };

});