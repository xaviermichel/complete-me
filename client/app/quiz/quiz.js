'use strict';

angular.module('completeMe')
    .config(function ($stateProvider) {
        $stateProvider
            .state('quiz', {
                url: '/quiz',
                templateUrl: 'app/quiz/quiz.html',
                controller: 'QuizController'
            });
    });