'use strict';

var userCount = 0;
var scores = [];

exports.initGame = function(io, socket) {
  console.log('gamefunction!');
  userCount++;
  io.emit('playerNum', userCount);

  if(userCount === 1 || userCount === 2) {
    socket.emit('playerNum', userCount);
  }

  if(userCount === 2) {
    io.emit('gameStart', null);
  }


  socket.on('timeout', score => {
    console.log('timeout:', score);
    scores.push(score);

    if(scores.length === 2) {
      //decide a winner
      var winner = determineWinner(scores);

      io.emit('winner', winner);
      scores = [];
    }

  })

  socket.on('disconnect', function() {
    userCount--;
    console.log('userCount:', userCount);
  })



}

function determineWinner(scores) {
  if(scores[0] === scores[1]) {
    return 'tie';
  } else if(scores[0] > scores[1]) {
    return scores[0];
  } else if(scores[1] > scores[0]) {
    return scores[1];
  }
}
