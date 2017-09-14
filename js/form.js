'use strict';

/*
 * Tuning input form
 */
(function () {
  var fieldTimeIn = document.getElementById('timein');
  var fieldTimeOut = document.getElementById('timeout');
  var fieldType = document.getElementById('type');
  var fieldPrice = document.getElementById('price');
  var fieldRoom = document.getElementById('room_number');
  var fieldCapacity = document.getElementById('capacity');

  fieldTimeIn.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value !== fieldTimeOut.value) {
      fieldTimeOut.value = target.value;
    }
  });

  fieldTimeOut.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value !== fieldTimeIn.value) {
      fieldTimeIn.value = target.value;
    }
  });

  fieldType.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value === 'flat') {
      fieldPrice.value = 1000;
    }
    if (target.value === 'bungalo') {
      fieldPrice.value = 0;
    }
    if (target.value === 'house') {
      fieldPrice.value = 5000;
    }
    if (target.value === 'palace') {
      fieldPrice.value = 10000;
    }
  });

  fieldRoom.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value === '1') {
      fieldCapacity.value = 1;
    }
    if (target.value === '2') {
      fieldCapacity.value = 2;
    }
    if (target.value === '3') {
      fieldCapacity.value = 3;
    }
    if (target.value === '100') {
      fieldCapacity.value = 0;
    }
  });
})();
