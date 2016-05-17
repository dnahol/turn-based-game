"use strict";

var app = angular.module("gameApp");

app.service("Service", function () {

  this.getMathQuestion = function(){

    var question = {};

    //get 2 random numbers, and answer
    question.num1 = Math.floor(Math.random() * (12 - 1) + 1);
    question.num2 = Math.floor(Math.random() * (12 - 1) + 1);
    question.answer = question.num1*question.num2;

    //show user the numbers
    return question;
  }

})
