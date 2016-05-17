'use strict'

var app = angular.module('gameApp', ['btford.socket-io'])

var player;
var score = 0;


app.factory('mySocket', function (socketFactory) {
  console.log('factory!');
  return socketFactory();
})

app.controller('mainCtrl', function($scope, Service, mySocket, $timeout) {
  console.log('mainCtrl!');
  $scope.userScore=score;

  $scope.question = Service.getMathQuestion();



  $scope.$on('socket:error',  function(ev, data) {
    console.log('socket error:', data);
  });

  mySocket.on('playerNum',  function(playerNum) {
    console.log('playerNum: ', playerNum);
    $scope.player = playerNum;
    $scope.waitText = 'Waiting for opponent'
  });

  mySocket.on('gameStart', () => {
    if($scope.player) {
      $scope.waitText= 'Press Start to Begin!'
ee    }
  })

  mySocket.on('winner', (winner) => {
    if(winner === 'draw') {
      $scope.waitText = 'You tied!';
    } else if(winner === score) {
      $scope.waitText = 'You win!';
    } else {
      $scope.waitText = 'You lose!';
    }

  })

$scope.startTimer = () => {
  console.log('timer!');
  $scope.waitText = 'Your timer has started! You have 20 seconds!'
$timeout(function () {
  mySocket.emit('timeout', score);
  $scope.waitText='Your time is up! Waiting for oponent to finish.'
}, 20000);
}

  $scope.checkAnswer = function(answer) {

    $scope.correctAns = $scope.question.answer;

    if(answer == $scope.question.answer) {
      console.log("correct");
      score += 10;
      $scope.userScore = score;
    }
    //update question
    $scope.question = Service.getMathQuestion();
  }








});
