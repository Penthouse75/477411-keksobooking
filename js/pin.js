'use strict';

/*
 * Event Handler Info panel
 */
(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var pinObjectBookingCloseInfoPanel = function () {
    var deactivePin = document.getElementsByClassName('pin--active');
    if (deactivePin.length !== 0) {
      deactivePin[0].classList.remove('pin--active');
    }

    var infoPanel = document.querySelector('.dialog');

    infoPanel.classList.add('hidden');
  };

  var infoPanelButtonCloseClickHandler = function () {
    pinObjectBookingCloseInfoPanel();
  };

  var pinObjectBookingOpenInfoPanel = function (evt) {
    var deactivePin = document.getElementsByClassName('pin--active');
    if (deactivePin.length !== 0) {
      deactivePin[0].classList.remove('pin--active');
    }

    var currentPin = evt.currentTarget;
    currentPin.classList.add('pin--active');

    var infoPanel = document.querySelector('.dialog');
    infoPanel.classList.remove('hidden');

    showObjectBookingOnInfoPanel(objectBookings[currentPin.value]);
  };

  var pinObjectBookingKeydownHandler = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      pinObjectBookingOpenInfoPanel(evt);
    }
    if (evt.keyCode === ESC_KEYCODE) {
      pinObjectBookingCloseInfoPanel(evt);
    }
  };

  var pinObjectBookingClickHandler = function (evt) {
    pinObjectBookingOpenInfoPanel(evt);
  };
})();